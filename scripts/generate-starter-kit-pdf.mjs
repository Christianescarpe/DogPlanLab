import fs from "node:fs";
import path from "node:path";
import {
  PDFDocument,
  StandardFonts,
  rgb,
} from "pdf-lib";

const PAGE_W = 612; // 8.5 in
const PAGE_H = 792; // 11.0 in
const MARGIN_X = 44;
const CONTENT_W = PAGE_W - MARGIN_X * 2; // 524 pt

// Print-clean, high-contrast B&W / grayscale palette
const C_INK = rgb(0.07, 0.08, 0.1);
const C_SOFT = rgb(0.26, 0.28, 0.32);
const C_MUTED = rgb(0.42, 0.44, 0.48);
const C_BORDER = rgb(0.74, 0.76, 0.79);
const C_BORDER_DARK = rgb(0.18, 0.2, 0.24);
const C_TINT = rgb(0.955, 0.96, 0.968);
const C_TINT_ALT = rgb(0.98, 0.982, 0.986);
const C_WHITE = rgb(1, 1, 1);

async function buildStarterKitPdf() {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.setTitle("Puppy Schedule Starter Kit — DogPlanLab");
  pdfDoc.setAuthor("DogPlanLab (dogplanlab.com)");
  pdfDoc.setSubject("Printable puppy schedules, charts & 7-day potty tracker");
  pdfDoc.setKeywords([
    "puppy schedule",
    "puppy routine chart",
    "potty training schedule",
    "8 week puppy schedule",
    "10 week puppy schedule",
    "12 week puppy schedule",
    "dogplanlab",
  ]);
  pdfDoc.setCreator("DogPlanLab PDF Generator");

  const fontSans = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontSansBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontSansItalic = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);
  const fontSerifBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const fontSerifItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);

  const form = pdfDoc.getForm();

  const ARROW_TOKEN = "\u2192";
  const ARROW_WIDTH_FACTOR = 1.15;

  // Measure text width supporting inline vector arrows (→)
  function measureText(text, font, size) {
    const parts = String(text).split(ARROW_TOKEN);
    let total = 0;
    for (let i = 0; i < parts.length; i++) {
      if (parts[i]) {
        total += font.widthOfTextAtSize(parts[i], size);
      }
      if (i < parts.length - 1) {
        total += size * ARROW_WIDTH_FACTOR;
      }
    }
    return total;
  }

  // Draw text supporting inline vector arrows (→)
  function drawRichLine(page, text, x, y, { font = fontSans, size = 10, color = C_INK } = {}) {
    const parts = String(text).split(ARROW_TOKEN);
    let curX = x;
    for (let i = 0; i < parts.length; i++) {
      if (parts[i]) {
        page.drawText(parts[i], { x: curX, y, font, size, color });
        curX += font.widthOfTextAtSize(parts[i], size);
      }
      if (i < parts.length - 1) {
        const arrowW = size * ARROW_WIDTH_FACTOR;
        const midY = y + size * 0.34;
        const startX = curX + size * 0.14;
        const endX = curX + arrowW - size * 0.14;
        const head = size * 0.25;
        page.drawLine({
          start: { x: startX, y: midY },
          end: { x: endX, y: midY },
          thickness: Math.max(0.9, size * 0.09),
          color,
        });
        page.drawLine({
          start: { x: endX - head, y: midY + head * 0.85 },
          end: { x: endX, y: midY },
          thickness: Math.max(0.9, size * 0.09),
          color,
        });
        page.drawLine({
          start: { x: endX - head, y: midY - head * 0.85 },
          end: { x: endX, y: midY },
          thickness: Math.max(0.9, size * 0.09),
          color,
        });
        curX += arrowW;
      }
    }
  }

  // Word-wrap text into lines that fit maxWidth
  function wrapText(text, font, size, maxWidth) {
    const paragraphs = String(text).split("\n");
    const lines = [];
    for (const para of paragraphs) {
      const words = para.split(/\s+/).filter(Boolean);
      if (words.length === 0) {
        lines.push("");
        continue;
      }
      let current = words[0];
      for (let i = 1; i < words.length; i++) {
        const candidate = `${current} ${words[i]}`;
        if (measureText(candidate, font, size) <= maxWidth) {
          current = candidate;
        } else {
          lines.push(current);
          current = words[i];
        }
      }
      lines.push(current);
    }
    return lines;
  }

  // Draw wrapped paragraph and return new Y coordinate
  function drawParagraph(
    page,
    text,
    x,
    y,
    {
      font = fontSans,
      size = 10,
      lineHeight = size * 1.4,
      maxWidth = CONTENT_W,
      color = C_INK,
      align = "left",
    } = {}
  ) {
    const lines = wrapText(text, font, size, maxWidth);
    let curY = y;
    for (const line of lines) {
      let drawX = x;
      if (align === "center") {
        const w = measureText(line, font, size);
        drawX = x + (maxWidth - w) / 2;
      } else if (align === "right") {
        const w = measureText(line, font, size);
        drawX = x + maxWidth - w;
      }
      drawRichLine(page, line, drawX, curY, { font, size, color });
      curY -= lineHeight;
    }
    return curY;
  }

  // Draw vector checkmark icon (✓)
  function drawCheckmarkIcon(page, cx, cy, size = 8, color = C_INK) {
    page.drawLine({
      start: { x: cx - size * 0.45, y: cy + size * 0.05 },
      end: { x: cx - size * 0.1, y: cy - size * 0.35 },
      thickness: 1.3,
      color,
    });
    page.drawLine({
      start: { x: cx - size * 0.1, y: cy - size * 0.35 },
      end: { x: cx + size * 0.5, y: cy + size * 0.45 },
      thickness: 1.3,
      color,
    });
  }

  // Create both a crisp printed checkbox border AND an interactive AcroForm PDFCheckBox
  function addInteractiveCheckbox(page, name, x, y, size = 11) {
    page.drawRectangle({
      x,
      y,
      width: size,
      height: size,
      borderColor: C_BORDER_DARK,
      borderWidth: 1,
      color: C_WHITE,
    });
    const cb = form.createCheckBox(name);
    cb.addToPage(page, {
      x: x + 0.5,
      y: y + 0.5,
      width: size - 1,
      height: size - 1,
      borderWidth: 0,
    });
    return cb;
  }

  // Create an interactive AcroForm PDFTextField with optional bottom underline for print
  function addInteractiveTextField(
    page,
    name,
    x,
    y,
    width,
    height = 16,
    { drawUnderline = true, drawBox = false, fontSize = 9.5 } = {}
  ) {
    if (drawBox) {
      page.drawRectangle({
        x,
        y,
        width,
        height,
        borderColor: C_BORDER,
        borderWidth: 0.75,
        color: C_WHITE,
      });
    } else if (drawUnderline) {
      page.drawLine({
        start: { x, y },
        end: { x: x + width, y },
        thickness: 0.8,
        color: C_BORDER_DARK,
      });
    }
    const tf = form.createTextField(name);
    tf.addToPage(page, {
      x: x + 1,
      y: y + 1,
      width: Math.max(8, width - 2),
      height: Math.max(8, height - 2),
      borderWidth: 0,
    });
    tf.setFontSize(fontSize);
    return tf;
  }

  // Standard page header & footer
  function drawPageChrome(page, pageNum, { categoryLabel = "DOGPLANLAB · STARTER KIT" } = {}) {
    // Top eyebrow bar
    page.drawText(categoryLabel, {
      x: MARGIN_X,
      y: PAGE_H - 34,
      font: fontSansBold,
      size: 7.5,
      color: C_MUTED,
    });
    const rightTag = `PAGE ${pageNum} OF 12`;
    const rw = fontSansBold.widthOfTextAtSize(rightTag, 7.5);
    page.drawText(rightTag, {
      x: PAGE_W - MARGIN_X - rw,
      y: PAGE_H - 34,
      font: fontSansBold,
      size: 7.5,
      color: C_MUTED,
    });
    page.drawLine({
      start: { x: MARGIN_X, y: PAGE_H - 40 },
      end: { x: PAGE_W - MARGIN_X, y: PAGE_H - 40 },
      thickness: 0.6,
      color: C_BORDER,
    });

    // Bottom footer rule + exact required footer copy
    page.drawLine({
      start: { x: MARGIN_X, y: 42 },
      end: { x: PAGE_W - MARGIN_X, y: 42 },
      thickness: 0.6,
      color: C_BORDER,
    });
    const footerLeft = "Free Puppy Schedule Starter Kit · dogplanlab.com";
    page.drawText(footerLeft, {
      x: MARGIN_X,
      y: 28,
      font: fontSans,
      size: 8,
      color: C_MUTED,
    });
    const footerRight = `${pageNum} / 12`;
    const frw = fontSansBold.widthOfTextAtSize(footerRight, 8);
    page.drawText(footerRight, {
      x: PAGE_W - MARGIN_X - frw,
      y: 28,
      font: fontSansBold,
      size: 8,
      color: C_MUTED,
    });
  }

  // Page Title + Subtitle helper
  function drawPageHeading(page, title, subhead, startY = PAGE_H - 66) {
    drawRichLine(page, title, MARGIN_X, startY, {
      font: fontSerifBold,
      size: 21,
      color: C_INK,
    });
    const nextY = drawParagraph(page, subhead, MARGIN_X, startY - 19, {
      font: fontSerifItalic,
      size: 10.5,
      lineHeight: 14,
      color: C_SOFT,
    });
    return nextY - 6;
  }

  // Helper to draw a structured 2-column timetable (Time | What happens)
  function drawScheduleTable(page, rows, startY, { rowHeight = 20.5, timeColW = 92 } = {}) {
    const actColW = CONTENT_W - timeColW;
    let y = startY;

    // Header row
    page.drawRectangle({
      x: MARGIN_X,
      y: y - rowHeight,
      width: CONTENT_W,
      height: rowHeight,
      color: C_TINT,
      borderColor: C_BORDER_DARK,
      borderWidth: 0.8,
    });
    page.drawLine({
      start: { x: MARGIN_X + timeColW, y },
      end: { x: MARGIN_X + timeColW, y: y - rowHeight },
      thickness: 0.6,
      color: C_BORDER_DARK,
    });
    page.drawText("Time", {
      x: MARGIN_X + 8,
      y: y - rowHeight + 6,
      font: fontSansBold,
      size: 9,
      color: C_INK,
    });
    page.drawText("What happens", {
      x: MARGIN_X + timeColW + 10,
      y: y - rowHeight + 6,
      font: fontSansBold,
      size: 9,
      color: C_INK,
    });
    y -= rowHeight;

    rows.forEach(([timeStr, activityStr], idx) => {
      const bg = idx % 2 === 1 ? C_TINT_ALT : C_WHITE;
      page.drawRectangle({
        x: MARGIN_X,
        y: y - rowHeight,
        width: CONTENT_W,
        height: rowHeight,
        color: bg,
        borderColor: C_BORDER,
        borderWidth: 0.5,
      });
      page.drawLine({
        start: { x: MARGIN_X + timeColW, y },
        end: { x: MARGIN_X + timeColW, y: y - rowHeight },
        thickness: 0.5,
        color: C_BORDER,
      });
      page.drawText(timeStr, {
        x: MARGIN_X + 8,
        y: y - rowHeight + 6,
        font: fontSansBold,
        size: 8.8,
        color: C_INK,
      });
      drawRichLine(page, activityStr, MARGIN_X + timeColW + 10, y - rowHeight + 6, {
        font: fontSans,
        size: 8.8,
        color: C_INK,
      });
      y -= rowHeight;
    });

    return y;
  }

  // Helper to draw a Key Facts Box with bold labels
  function drawKeyFactsBox(page, title, items, startY, { fontSize = 8.8, lineGap = 13 } = {}) {
    // Calculate box height
    const wrappedItems = items.map(([label, desc]) => {
      const fullText = `${label}: ${desc}`;
      const lines = wrapText(fullText, fontSans, fontSize, CONTENT_W - 28);
      return { label, desc, lines };
    });
    const totalLines = wrappedItems.reduce((acc, item) => acc + item.lines.length, 0);
    const boxH = 22 + totalLines * lineGap + (wrappedItems.length - 1) * 2 + 8;

    page.drawRectangle({
      x: MARGIN_X,
      y: startY - boxH,
      width: CONTENT_W,
      height: boxH,
      color: C_TINT,
      borderColor: C_BORDER_DARK,
      borderWidth: 0.8,
    });

    page.drawText(title.toUpperCase(), {
      x: MARGIN_X + 12,
      y: startY - 15,
      font: fontSansBold,
      size: 7.8,
      color: C_SOFT,
    });

    let curY = startY - 29;
    for (const item of wrappedItems) {
      // Bullet dot
      page.drawText("•", {
        x: MARGIN_X + 12,
        y: curY,
        font: fontSansBold,
        size: fontSize,
        color: C_INK,
      });

      // First line: render bold label + regular rest
      const firstLine = item.lines[0];
      const prefix = `${item.label}: `;
      if (firstLine.startsWith(prefix)) {
        page.drawText(prefix, {
          x: MARGIN_X + 22,
          y: curY,
          font: fontSansBold,
          size: fontSize,
          color: C_INK,
        });
        const labelW = fontSansBold.widthOfTextAtSize(prefix, fontSize);
        const restFirst = firstLine.slice(prefix.length);
        drawRichLine(page, restFirst, MARGIN_X + 22 + labelW, curY, {
          font: fontSans,
          size: fontSize,
          color: C_INK,
        });
      } else {
        drawRichLine(page, firstLine, MARGIN_X + 22, curY, {
          font: fontSans,
          size: fontSize,
          color: C_INK,
        });
      }
      curY -= lineGap;

      for (let i = 1; i < item.lines.length; i++) {
        drawRichLine(page, item.lines[i], MARGIN_X + 22, curY, {
          font: fontSans,
          size: fontSize,
          color: C_INK,
        });
        curY -= lineGap;
      }
      curY -= 2;
    }

    return startY - boxH - 10;
  }

  // Helper to draw bottom notes + disclaimer
  function drawBottomSection(page, notes, disclaimer, yStart) {
    let y = yStart;
    for (const note of notes) {
      page.drawText("•", {
        x: MARGIN_X,
        y,
        font: fontSansBold,
        size: 8.5,
        color: C_SOFT,
      });
      y = drawParagraph(page, note, MARGIN_X + 10, y, {
        font: fontSans,
        size: 8.5,
        lineHeight: 12,
        maxWidth: CONTENT_W - 10,
        color: C_SOFT,
      });
      y -= 3;
    }
    if (disclaimer) {
      const dText = `Disclaimer: ${disclaimer}`;
      const dLines = wrapText(dText, fontSansItalic, 7.6, CONTENT_W);
      const startDY = dLines.length > 1 ? 58 : 50;
      drawParagraph(page, dText, MARGIN_X, startDY, {
        font: fontSansItalic,
        size: 7.6,
        lineHeight: 10.2,
        maxWidth: CONTENT_W,
        color: C_MUTED,
      });
    }
  }

  // =========================================================================
  // PAGE 1 — Cover
  // =========================================================================
  {
    const page = pdfDoc.addPage([PAGE_W, PAGE_H]);

    // Clean framed outer border for cover
    page.drawRectangle({
      x: MARGIN_X,
      y: 56,
      width: CONTENT_W,
      height: PAGE_H - 104,
      borderColor: C_BORDER_DARK,
      borderWidth: 1.5,
      color: C_WHITE,
    });
    page.drawRectangle({
      x: MARGIN_X + 5,
      y: 61,
      width: CONTENT_W - 10,
      height: PAGE_H - 114,
      borderColor: C_BORDER,
      borderWidth: 0.6,
    });

    // Brand badge at top
    const badgeText = "DOGPLANLAB · PRINTABLE IMPLEMENTATION KIT";
    const badgeW = fontSansBold.widthOfTextAtSize(badgeText, 8.5) + 28;
    page.drawRectangle({
      x: (PAGE_W - badgeW) / 2,
      y: PAGE_H - 135,
      width: badgeW,
      height: 24,
      color: C_TINT,
      borderColor: C_BORDER_DARK,
      borderWidth: 0.8,
    });
    page.drawText(badgeText, {
      x: (PAGE_W - badgeW) / 2 + 14,
      y: PAGE_H - 126,
      font: fontSansBold,
      size: 8.5,
      color: C_INK,
    });

    // Title
    const title = "Puppy Schedule Starter Kit";
    const titleW = fontSerifBold.widthOfTextAtSize(title, 31);
    page.drawText(title, {
      x: (PAGE_W - titleW) / 2,
      y: PAGE_H - 195,
      font: fontSerifBold,
      size: 31,
      color: C_INK,
    });

    // Subtitle
    const subtitle = "Printable schedules, charts & trackers — from wake-up to bedtime.";
    const subW = fontSerifItalic.widthOfTextAtSize(subtitle, 13.5);
    page.drawText(subtitle, {
      x: (PAGE_W - subW) / 2,
      y: PAGE_H - 222,
      font: fontSerifItalic,
      size: 13.5,
      color: C_SOFT,
    });

    // Decorative rule
    page.drawLine({
      start: { x: PAGE_W / 2 - 60, y: PAGE_H - 244 },
      end: { x: PAGE_W / 2 + 60, y: PAGE_H - 244 },
      thickness: 1.2,
      color: C_BORDER_DARK,
    });

    // Body copy
    const bodyCopy =
      "Everything in this kit comes from dogplanlab.com's puppy schedule guides — reformatted to live on your refrigerator, not on your phone. Print it, check things off, and always know what comes next.";
    drawParagraph(page, bodyCopy, MARGIN_X + 52, PAGE_H - 275, {
      font: fontSans,
      size: 11.2,
      lineHeight: 17.5,
      maxWidth: CONTENT_W - 104,
      color: C_INK,
      align: "center",
    });

    // How to use this kit box
    const howBoxX = MARGIN_X + 44;
    const howBoxW = CONTENT_W - 88;
    const howBoxY = PAGE_H - 392;
    page.drawRectangle({
      x: howBoxX,
      y: howBoxY,
      width: howBoxW,
      height: 58,
      color: C_TINT,
      borderColor: C_BORDER_DARK,
      borderWidth: 1,
    });
    const howLabel = "HOW TO USE THIS KIT";
    const hlW = fontSansBold.widthOfTextAtSize(howLabel, 8.5);
    page.drawText(howLabel, {
      x: (PAGE_W - hlW) / 2,
      y: howBoxY + 38,
      font: fontSansBold,
      size: 8.5,
      color: C_SOFT,
    });
    const howLine = "Print pages 2–6 for the fridge. Print pages 8–9 fresh each week.";
    const hwW = fontSansBold.widthOfTextAtSize(howLine, 11);
    page.drawText(howLine, {
      x: (PAGE_W - hwW) / 2,
      y: howBoxY + 16,
      font: fontSansBold,
      size: 11,
      color: C_INK,
    });

    // What's inside directory table on cover for quick navigation
    const dirY = PAGE_H - 430;
    const dirHeader = "WHAT'S INSIDE (12 PAGES)";
    const dhW = fontSansBold.widthOfTextAtSize(dirHeader, 8.5);
    page.drawText(dirHeader, {
      x: (PAGE_W - dhW) / 2,
      y: dirY,
      font: fontSansBold,
      size: 8.5,
      color: C_MUTED,
    });

    const contentsList = [
      ["Page 2", "Daily Puppy Routine Chart (Fridge Centerpiece)"],
      ["Page 3", "8-Week Puppy Schedule"],
      ["Page 4", "10-Week Puppy Schedule"],
      ["Page 5", "12-Week Puppy Schedule"],
      ["Page 6", "Feeding + Potty: The Paired Schedule"],
      ["Page 7", "Small-Breed Adjustments"],
      ["Pages 8–9", "7-Day Potty Tracker & Accident Log (Weekly Spread)"],
      ["Page 10", "Bedtime Routine Checklist"],
      ["Page 11", "What Changes as Your Puppy Gets Older"],
      ["Page 12", "Make It Yours (Personalization Sheet)"],
    ];

    let cy = dirY - 20;
    for (const [pg, label] of contentsList) {
      page.drawText(pg, {
        x: MARGIN_X + 76,
        y: cy,
        font: fontSansBold,
        size: 9,
        color: C_INK,
      });
      page.drawText(label, {
        x: MARGIN_X + 148,
        y: cy,
        font: fontSans,
        size: 9,
        color: C_SOFT,
      });
      cy -= 17;
    }

    // Cover Footer line (exact copy from spec)
    const coverFooter =
      "Free from DogPlanLab · dogplanlab.com — the full guides behind every page in this kit.";
    const cfW = fontSansBold.widthOfTextAtSize(coverFooter, 8.8);
    page.drawText(coverFooter, {
      x: (PAGE_W - cfW) / 2,
      y: 82,
      font: fontSansBold,
      size: 8.8,
      color: C_INK,
    });

    // Global footer
    drawPageChrome(page, 1);
  }

  // =========================================================================
  // PAGE 2 — Daily Puppy Routine Chart
  // =========================================================================
  {
    const page = pdfDoc.addPage([PAGE_W, PAGE_H]);
    drawPageChrome(page, 2, { categoryLabel: "FRIDGE CENTERPIECE · DAILY ROUTINE" });

    let y = drawPageHeading(
      page,
      "Daily Puppy Routine Chart",
      "Example day for a puppy around 8–12 weeks. Move every time to fit your wake time — the pattern is what matters, not the clock."
    );

    // The loop banner (bold, top of page)
    const loopBoxH = 28;
    page.drawRectangle({
      x: MARGIN_X,
      y: y - loopBoxH,
      width: CONTENT_W,
      height: loopBoxH,
      color: C_TINT,
      borderColor: C_BORDER_DARK,
      borderWidth: 1,
    });
    const loopCopy = "THE LOOP:  wake → potty → eat or play → short activity → nap → repeat";
    const loopW = measureText(loopCopy, fontSansBold, 10);
    drawRichLine(page, loopCopy, MARGIN_X + (CONTENT_W - loopW) / 2, y - 18, {
      font: fontSansBold,
      size: 10,
      color: C_INK,
    });
    y -= loopBoxH + 10;

    // Chart (checkbox + time + activity)
    const p2Rows = [
      ["6:30 AM", "Wake up — straight outside to potty"],
      ["6:45 AM", "Breakfast"],
      ["7:00 AM", "Potty again, then play or short training (5–10 min)"],
      ["7:45 AM", "Nap (enforced — not just a quiet room)"],
      ["9:30 AM", "Wake, potty, short play"],
      ["10:00 AM", "Nap"],
      ["12:00 PM", "Wake, potty, lunch, short training"],
      ["12:45 PM", "Nap"],
      ["2:30 PM", "Wake, potty, play"],
      ["3:15 PM", "Nap"],
      ["5:00 PM", "Wake, potty, dinner"],
      ["5:30 PM", "Family time, gentle play"],
      ["7:00 PM", "Potty, calm wind-down (chew toy, low activity)"],
      ["8:30 PM", 'Final potty break ("last call")'],
      ["9:00 PM", "Bedtime"],
    ];

    const chkColW = 34;
    const timeColW = 86;
    const rowH = 24.5;

    // Header
    page.drawRectangle({
      x: MARGIN_X,
      y: y - rowH,
      width: CONTENT_W,
      height: rowH,
      color: C_TINT,
      borderColor: C_BORDER_DARK,
      borderWidth: 0.8,
    });
    drawCheckmarkIcon(page, MARGIN_X + chkColW / 2, y - rowH / 2, 8, C_INK);
    page.drawLine({
      start: { x: MARGIN_X + chkColW, y },
      end: { x: MARGIN_X + chkColW, y: y - rowH },
      thickness: 0.6,
      color: C_BORDER_DARK,
    });
    page.drawLine({
      start: { x: MARGIN_X + chkColW + timeColW, y },
      end: { x: MARGIN_X + chkColW + timeColW, y: y - rowH },
      thickness: 0.6,
      color: C_BORDER_DARK,
    });
    page.drawText("Time", {
      x: MARGIN_X + chkColW + 10,
      y: y - rowH + 8,
      font: fontSansBold,
      size: 9.2,
      color: C_INK,
    });
    page.drawText("What happens", {
      x: MARGIN_X + chkColW + timeColW + 12,
      y: y - rowH + 8,
      font: fontSansBold,
      size: 9.2,
      color: C_INK,
    });
    y -= rowH;

    p2Rows.forEach(([timeStr, actStr], idx) => {
      const bg = idx % 2 === 1 ? C_TINT_ALT : C_WHITE;
      page.drawRectangle({
        x: MARGIN_X,
        y: y - rowH,
        width: CONTENT_W,
        height: rowH,
        color: bg,
        borderColor: C_BORDER,
        borderWidth: 0.5,
      });
      page.drawLine({
        start: { x: MARGIN_X + chkColW, y },
        end: { x: MARGIN_X + chkColW, y: y - rowH },
        thickness: 0.5,
        color: C_BORDER,
      });
      page.drawLine({
        start: { x: MARGIN_X + chkColW + timeColW, y },
        end: { x: MARGIN_X + chkColW + timeColW, y: y - rowH },
        thickness: 0.5,
        color: C_BORDER,
      });

      addInteractiveCheckbox(
        page,
        `p2_routine_chk_${idx + 1}`,
        MARGIN_X + (chkColW - 11) / 2,
        y - rowH + (rowH - 11) / 2,
        11
      );

      page.drawText(timeStr, {
        x: MARGIN_X + chkColW + 10,
        y: y - rowH + 8,
        font: fontSansBold,
        size: 9.2,
        color: C_INK,
      });
      drawRichLine(page, actStr, MARGIN_X + chkColW + timeColW + 12, y - rowH + 8, {
        font: fontSans,
        size: 9.2,
        color: C_INK,
      });
      y -= rowH;
    });

    drawBottomSection(
      page,
      [
        "Overnight breaks are normal at this age — many puppies begin sleeping longer stretches around 4–5 months. Don't rush it.",
        "Full guide: dogplanlab.com/puppy-schedule/",
      ],
      "Example routine, not a prescription. Adjust to your puppy and your vet's guidance.",
      y - 16
    );
  }

  // =========================================================================
  // PAGE 3 — 8-Week Puppy Schedule
  // =========================================================================
  {
    const page = pdfDoc.addPage([PAGE_W, PAGE_H]);
    drawPageChrome(page, 3, { categoryLabel: "AGE-SPECIFIC TIMETABLE · 8 WEEKS" });

    let y = drawPageHeading(
      page,
      "8-Week Puppy Schedule",
      'Mostly sleep, very short awake windows. Expect to be "on shift" most of the day — that\'s normal.'
    );

    y = drawKeyFactsBox(
      page,
      "Key Facts (8 Weeks)",
      [
        ["Meals", '3–4 small meals/day (the AKC calls four "usually adequate"; some guides say three)'],
        ["Potty", "after every wake-up, meal, and play session — plus roughly every 1–2 hours when awake"],
        ["Training", "bursts of 2–3 minutes, a few times a day"],
        ["Sleep", "most of the day; short awake windows are normal"],
      ],
      y
    );

    const p3Rows = [
      ["6:30 AM", "Wake up, straight outside to potty"],
      ["6:45 AM", "Breakfast (meal 1)"],
      ["7:00 AM", "Potty again, then a few minutes of gentle play"],
      ["7:30 AM", "Enforced nap (crate or pen)"],
      ["9:30 AM", "Wake, potty, tiny training burst (name, sit)"],
      ["10:00 AM", "Nap"],
      ["12:00 PM", "Wake, potty, lunch (meal 2)"],
      ["12:30 PM", "Potty, calm exploration or chew toy"],
      ["1:00 PM", "Nap"],
      ["3:00 PM", "Wake, potty, short play"],
      ["3:30 PM", "Meal 3, then potty"],
      ["4:00 PM", "Nap"],
      ["5:30 PM", "Wake, potty, dinner (meal 4 — or meal 3 if on three meals)"],
      ["6:00 PM", "Potty, gentle family time"],
      ["7:30 PM", "Wind-down begins: low energy, chew toy"],
      ["8:30 PM", "Final potty break"],
      ["9:00 PM", "Bedtime (overnight outings are normal at this age)"],
    ];

    y = drawScheduleTable(page, p3Rows, y, { rowHeight: 21 });

    drawBottomSection(
      page,
      [
        "Bladder control: as a rough rule of thumb, about an hour per month of age (some sources say plus one hour) is cited as a maximum — never a target. Waking, drinking, play, or excitement can mean a trip within minutes.",
        "Full guide: dogplanlab.com/puppy-schedule/by-age/#8-weeks",
      ],
      "Example day. Your puppy's signals matter more than the clock. Confirm vaccine timing with your vet.",
      y - 14
    );
  }

  // =========================================================================
  // PAGE 4 — 10-Week Puppy Schedule
  // =========================================================================
  {
    const page = pdfDoc.addPage([PAGE_W, PAGE_H]);
    drawPageChrome(page, 4, { categoryLabel: "AGE-SPECIFIC TIMETABLE · 10 WEEKS" });

    let y = drawPageHeading(
      page,
      "10-Week Puppy Schedule",
      "Like the 8-week day, with slightly longer stretches between naps and potty breaks — and training starts to click."
    );

    y = drawKeyFactsBox(
      page,
      "Key Facts (10 Weeks)",
      [
        ["Meals", "3–4/day (same as 8 weeks)"],
        ["Potty", 'same trigger moments, slightly longer gaps between the "in-between" breaks'],
        ["Training", "5-minute sessions, a few times a day, become genuinely productive"],
        [
          "Vaccines",
          "second core dose typically due in the 10–12 week window — confirm with your vet before expanding outings",
        ],
      ],
      y
    );

    const p4Rows = [
      ["6:30 AM", "Wake up, straight outside to potty"],
      ["6:45 AM", "Breakfast (meal 1)"],
      ["7:00 AM", "Potty, then 5-minute training session (sit, name, come)"],
      ["7:30 AM", "Nap"],
      ["9:30 AM", "Wake, potty, play or short training"],
      ["10:15 AM", "Nap"],
      ["12:00 PM", "Wake, potty, lunch (meal 2)"],
      ["12:30 PM", "Potty, calm socialization (new sound, surface, or visitor at home)"],
      ["1:15 PM", "Nap"],
      ["3:00 PM", "Wake, potty, play"],
      ["3:30 PM", "Meal 3, then potty"],
      ["4:15 PM", "Nap"],
      ["5:30 PM", "Wake, potty, dinner (meal 4 — or meal 3 if on three meals)"],
      ["6:00 PM", "Potty, family time and gentle play"],
      ["7:30 PM", "Wind-down: low energy, chew toy"],
      ["8:30 PM", "Final potty break"],
      ["9:00 PM", "Bedtime (many 10-week-olds still need overnight outings)"],
    ];

    y = drawScheduleTable(page, p4Rows, y, { rowHeight: 21 });

    drawBottomSection(
      page,
      [
        "If your puppy consistently leaves food, that's a readiness signal for the 3–6-month meal transition conversation with your vet — not a cue to change anything yet.",
        "Full guide: dogplanlab.com/puppy-schedule/by-age/#10-weeks",
      ],
      "Example day. Your puppy's signals matter more than the clock. Confirm vaccine timing with your vet.",
      y - 14
    );
  }

  // =========================================================================
  // PAGE 5 — 12-Week Puppy Schedule
  // =========================================================================
  {
    const page = pdfDoc.addPage([PAGE_W, PAGE_H]);
    drawPageChrome(page, 5, { categoryLabel: "AGE-SPECIFIC TIMETABLE · 12 WEEKS" });

    let y = drawPageHeading(
      page,
      "12-Week Puppy Schedule",
      "Roomier days, teething begins, and the 4→3 meal question arrives."
    );

    y = drawKeyFactsBox(
      page,
      "Key Facts (12 Weeks)",
      [
        [
          "Meals",
          "3–4/day — many puppies begin transitioning to 3 sometime between 3 and 6 months (readiness + vet go-ahead, not the calendar)",
        ],
        ["Potty", "gradually longer gaps as reliability improves"],
        ["Teething", "permanent teeth begin erupting (~12–16 weeks) — chew toys become essential"],
        ["Training", "5–10 minute sessions now work well"],
        [
          "Vaccines",
          'further along the series (leptospirosis, now considered core by AAHA, isn\'t started before 12 weeks) — but "further along" isn\'t "fully protected"; confirm with your vet',
        ],
      ],
      y,
      { fontSize: 8.4, lineGap: 11.8 }
    );

    const p5Rows = [
      ["6:30 AM", "Wake up, straight outside to potty"],
      ["6:45 AM", "Breakfast"],
      ["7:00 AM", "Potty, then 5–10 minute training session"],
      ["7:45 AM", "Nap"],
      ["10:00 AM", "Wake, potty, play + calm socialization outing (vet-approved)"],
      ["11:00 AM", "Nap"],
      ["12:30 PM", "Wake, potty, lunch"],
      ["1:00 PM", "Potty, chew-toy time (teething management)"],
      ["1:30 PM", "Nap"],
      ["3:30 PM", "Wake, potty, play or training"],
      ["4:30 PM", "Nap"],
      ["5:30 PM", "Wake, potty, dinner"],
      ["6:00 PM", "Potty, family time"],
      ["7:30 PM", "Wind-down: calm activity, chew toy"],
      ["8:30 PM", "Final potty break"],
      ["9:00 PM", "Bedtime"],
    ];

    y = drawScheduleTable(page, p5Rows, y, { rowHeight: 19.5 });

    // Meal transition box
    y -= 8;
    const transBoxH = 34;
    page.drawRectangle({
      x: MARGIN_X,
      y: y - transBoxH,
      width: CONTENT_W,
      height: transBoxH,
      color: C_TINT,
      borderColor: C_BORDER_DARK,
      borderWidth: 0.8,
    });
    page.drawText("MEAL TRANSITION:", {
      x: MARGIN_X + 10,
      y: y - 14,
      font: fontSansBold,
      size: 8.2,
      color: C_INK,
    });
    drawRichLine(
      page,
      "Moving from 4 meals to 3: redistribute one meal's portion across the other three over several days — only on your vet's go-ahead.",
      MARGIN_X + 10,
      y - 26,
      { font: fontSans, size: 8.4, color: C_INK }
    );
    y -= transBoxH + 10;

    drawBottomSection(
      page,
      ["Full guide: dogplanlab.com/puppy-schedule/by-age/#12-weeks"],
      "Example day. Your puppy's signals matter more than the clock. Confirm vaccine timing with your vet.",
      y
    );
  }

  // =========================================================================
  // PAGE 6 — Feeding + Potty Paired Schedule
  // =========================================================================
  {
    const page = pdfDoc.addPage([PAGE_W, PAGE_H]);
    drawPageChrome(page, 6, { categoryLabel: "CAUSAL SCHEDULE · FEEDING & POTTY" });

    let y = drawPageHeading(
      page,
      "Feeding + Potty: The Paired Schedule",
      "The rule everything hangs on: predictable meals produce predictable potty."
    );

    // Rule box (bold)
    const ruleBoxH = 38;
    page.drawRectangle({
      x: MARGIN_X,
      y: y - ruleBoxH,
      width: CONTENT_W,
      height: ruleBoxH,
      color: C_TINT,
      borderColor: C_BORDER_DARK,
      borderWidth: 1,
    });
    drawParagraph(
      page,
      "Every meal is followed by an outside trip about 10–20 minutes later. Every wake-up, play session, and 1–2 hour gap gets one too.",
      MARGIN_X + 12,
      y - 15,
      {
        font: fontSansBold,
        size: 9.5,
        lineHeight: 13.5,
        maxWidth: CONTENT_W - 24,
        color: C_INK,
      }
    );
    y -= ruleBoxH + 14;

    // Feeding discipline (checkbox list)
    page.drawText("FEEDING DISCIPLINE CHECKLIST", {
      x: MARGIN_X,
      y,
      font: fontSansBold,
      size: 8.5,
      color: C_SOFT,
    });
    y -= 16;

    const discItems = [
      "Same meal times every day, 7 days a week",
      "Bowl down 15–20 minutes, then up (grazing makes potty timing much harder to predict)",
      "Same spot, same routine, same path outside afterward",
      "Log for 3–4 days: what time each meal ended → when poop followed (your puppy's personal window is the most useful number in this kit)",
    ];

    discItems.forEach((item, idx) => {
      addInteractiveCheckbox(page, `p6_discipline_chk_${idx + 1}`, MARGIN_X, y - 2, 11);
      y = drawParagraph(page, item, MARGIN_X + 18, y, {
        font: fontSans,
        size: 9.2,
        lineHeight: 13.5,
        maxWidth: CONTENT_W - 18,
        color: C_INK,
      });
      y -= 5;
    });

    y -= 6;

    // Paired mini-chart
    page.drawText("PAIRED MINI-CHART", {
      x: MARGIN_X,
      y,
      font: fontSansBold,
      size: 8.5,
      color: C_SOFT,
    });
    y -= 8;

    const col1 = 110;
    const col2 = 100;
    const rowH = 22;

    page.drawRectangle({
      x: MARGIN_X,
      y: y - rowH,
      width: CONTENT_W,
      height: rowH,
      color: C_TINT,
      borderColor: C_BORDER_DARK,
      borderWidth: 0.8,
    });
    page.drawText("Meal", { x: MARGIN_X + 8, y: y - 15, font: fontSansBold, size: 9, color: C_INK });
    page.drawText("Example time", {
      x: MARGIN_X + col1 + 8,
      y: y - 15,
      font: fontSansBold,
      size: 9,
      color: C_INK,
    });
    page.drawText("Potty follow-up", {
      x: MARGIN_X + col1 + col2 + 8,
      y: y - 15,
      font: fontSansBold,
      size: 9,
      color: C_INK,
    });
    y -= rowH;

    const pairedRows = [
      ["Breakfast", "6:45 AM", "Outside ~7:00 AM (poop window: about 10–20 min after the meal)"],
      ["Lunch", "12:00 PM", "Outside ~12:20 PM"],
      ["Afternoon meal", "3:30 PM", "Outside ~3:45 PM"],
      ["Dinner", "5:30 PM", "Outside ~5:50 PM"],
    ];

    pairedRows.forEach(([meal, exTime, follow], idx) => {
      const bg = idx % 2 === 1 ? C_TINT_ALT : C_WHITE;
      page.drawRectangle({
        x: MARGIN_X,
        y: y - rowH,
        width: CONTENT_W,
        height: rowH,
        color: bg,
        borderColor: C_BORDER,
        borderWidth: 0.5,
      });
      page.drawLine({
        start: { x: MARGIN_X + col1, y },
        end: { x: MARGIN_X + col1, y: y - rowH },
        thickness: 0.5,
        color: C_BORDER,
      });
      page.drawLine({
        start: { x: MARGIN_X + col1 + col2, y },
        end: { x: MARGIN_X + col1 + col2, y: y - rowH },
        thickness: 0.5,
        color: C_BORDER,
      });
      page.drawText(meal, {
        x: MARGIN_X + 8,
        y: y - 15,
        font: fontSansBold,
        size: 8.8,
        color: C_INK,
      });
      page.drawText(exTime, {
        x: MARGIN_X + col1 + 8,
        y: y - 15,
        font: fontSans,
        size: 8.8,
        color: C_INK,
      });
      page.drawText(follow, {
        x: MARGIN_X + col1 + col2 + 8,
        y: y - 15,
        font: fontSans,
        size: 8.8,
        color: C_INK,
      });
      y -= rowH;
    });

    y -= 14;

    // Meals-by-age box
    const mbaBoxH = 82;
    page.drawRectangle({
      x: MARGIN_X,
      y: y - mbaBoxH,
      width: CONTENT_W,
      height: mbaBoxH,
      color: C_TINT,
      borderColor: C_BORDER_DARK,
      borderWidth: 0.8,
    });
    page.drawText("MEALS BY AGE", {
      x: MARGIN_X + 12,
      y: y - 15,
      font: fontSansBold,
      size: 8.2,
      color: C_SOFT,
    });
    const mbaLines = [
      ["• 6–12 weeks: ", "3–4/day", ' (AKC: four "usually adequate"; some guides: three)'],
      ["• 3–6 months: ", "3/day", " (transition sometime in this window, readiness-based)"],
      ["• 6–12 months: ", "2/day", ""],
    ];
    let my = y - 30;
    for (const [pre, bld, suf] of mbaLines) {
      page.drawText(pre, { x: MARGIN_X + 12, y: my, font: fontSans, size: 8.8, color: C_INK });
      const pw = fontSans.widthOfTextAtSize(pre, 8.8);
      page.drawText(bld, {
        x: MARGIN_X + 12 + pw,
        y: my,
        font: fontSansBold,
        size: 8.8,
        color: C_INK,
      });
      const bw = fontSansBold.widthOfTextAtSize(bld, 8.8);
      page.drawText(suf, {
        x: MARGIN_X + 12 + pw + bw,
        y: my,
        font: fontSans,
        size: 8.8,
        color: C_INK,
      });
      my -= 14;
    }
    page.drawText("Your vet may adjust for breed size and the individual puppy.", {
      x: MARGIN_X + 12,
      y: my - 2,
      font: fontSansItalic,
      size: 8.4,
      color: C_SOFT,
    });

    y -= mbaBoxH + 16;

    // Blank "My puppy's meal times" write-in line (4 blanks)
    page.drawRectangle({
      x: MARGIN_X,
      y: y - 42,
      width: CONTENT_W,
      height: 42,
      color: C_WHITE,
      borderColor: C_BORDER_DARK,
      borderWidth: 0.9,
    });
    page.drawText("My puppy's meal times:", {
      x: MARGIN_X + 12,
      y: y - 25,
      font: fontSansBold,
      size: 9.5,
      color: C_INK,
    });
    const slotStartX = MARGIN_X + 135;
    const slotW = 84;
    const slotGap = 10;
    for (let i = 0; i < 4; i++) {
      const sx = slotStartX + i * (slotW + slotGap);
      addInteractiveTextField(page, `p6_my_meal_time_${i + 1}`, sx, y - 30, slotW, 18, {
        drawUnderline: true,
        fontSize: 9.5,
      });
      page.drawText(`Meal ${i + 1}`, {
        x: sx + 2,
        y: y - 12,
        font: fontSans,
        size: 7,
        color: C_MUTED,
      });
    }
    y -= 56;

    drawBottomSection(
      page,
      [
        "Pee timing stays event-driven (wake, play, excitement, every 1–2 hours when awake) no matter how regular meals get.",
        "Full guide: dogplanlab.com/potty-training/schedule/",
      ],
      "General guidance. Confirm feeding plans with your vet.",
      y
    );
  }

  // =========================================================================
  // PAGE 7 — Small-Breed Adjustments
  // =========================================================================
  {
    const page = pdfDoc.addPage([PAGE_W, PAGE_H]);
    drawPageChrome(page, 7, { categoryLabel: "BREED SIZE GUIDE · SMALL & TOY BREEDS" });

    let y = drawPageHeading(
      page,
      "Small-Breed Adjustments",
      "Same loop, tighter spacing. You don't need a different schedule — just these adjustments."
    );

    // 3-column comparison table
    const c1W = 126;
    const c2W = 140;
    const c3W = CONTENT_W - c1W - c2W;
    const headerH = 24;

    page.drawRectangle({
      x: MARGIN_X,
      y: y - headerH,
      width: CONTENT_W,
      height: headerH,
      color: C_TINT,
      borderColor: C_BORDER_DARK,
      borderWidth: 0.8,
    });
    page.drawLine({
      start: { x: MARGIN_X + c1W, y },
      end: { x: MARGIN_X + c1W, y: y - headerH },
      thickness: 0.6,
      color: C_BORDER_DARK,
    });
    page.drawLine({
      start: { x: MARGIN_X + c1W + c2W, y },
      end: { x: MARGIN_X + c1W + c2W, y: y - headerH },
      thickness: 0.6,
      color: C_BORDER_DARK,
    });
    page.drawText("Standard puppies", {
      x: MARGIN_X + c1W + 10,
      y: y - 16,
      font: fontSansBold,
      size: 9.2,
      color: C_INK,
    });
    page.drawText("Small / toy breeds", {
      x: MARGIN_X + c1W + c2W + 10,
      y: y - 16,
      font: fontSansBold,
      size: 9.2,
      color: C_INK,
    });
    y -= headerH;

    const p7Rows = [
      [
        "Meals/day (8–12 wks)",
        "3–4",
        "4–5 small meals (per Chewy's vet-reviewed feeding guide)",
      ],
      ["Meals/day (3–6 mo)", "3 → 2", "3, dropping to 2 around 6 months"],
      [
        "Potty breaks (very young)",
        "Every 1–2 hrs",
        "Every 1–2 hrs when very young — plan on at least as many trips as for a larger puppy, and let your puppy's signals set the pace",
      ],
      [
        "House-training timeline",
        "Varies by puppy",
        "Varies by individual puppy; small and toy breeds are often slower to become fully reliable — patience, not punishment",
      ],
      [
        "Kibble",
        "Standard",
        "Small-sized kibble for tiny mouths; follow the bag's chart for amounts and check food choice with your vet",
      ],
    ];

    p7Rows.forEach(([label, stdText, smallText], idx) => {
      const l1 = wrapText(label, fontSansBold, 9, c1W - 16);
      const l2 = wrapText(stdText, fontSans, 9, c2W - 16);
      const l3 = wrapText(smallText, fontSans, 9, c3W - 16);
      const maxLines = Math.max(l1.length, l2.length, l3.length);
      const rH = Math.max(30, maxLines * 13.5 + 14);

      const bg = idx % 2 === 1 ? C_TINT_ALT : C_WHITE;
      page.drawRectangle({
        x: MARGIN_X,
        y: y - rH,
        width: CONTENT_W,
        height: rH,
        color: bg,
        borderColor: C_BORDER,
        borderWidth: 0.5,
      });
      page.drawLine({
        start: { x: MARGIN_X + c1W, y },
        end: { x: MARGIN_X + c1W, y: y - rH },
        thickness: 0.5,
        color: C_BORDER,
      });
      page.drawLine({
        start: { x: MARGIN_X + c1W + c2W, y },
        end: { x: MARGIN_X + c1W + c2W, y: y - rH },
        thickness: 0.5,
        color: C_BORDER,
      });

      drawParagraph(page, label, MARGIN_X + 8, y - 15, {
        font: fontSansBold,
        size: 9,
        lineHeight: 13.5,
        maxWidth: c1W - 16,
      });
      drawParagraph(page, stdText, MARGIN_X + c1W + 10, y - 15, {
        font: fontSans,
        size: 9,
        lineHeight: 13.5,
        maxWidth: c2W - 16,
      });
      drawParagraph(page, smallText, MARGIN_X + c1W + c2W + 10, y - 15, {
        font: fontSans,
        size: 9,
        lineHeight: 13.5,
        maxWidth: c3W - 16,
      });

      y -= rH;
    });

    y -= 20;

    // Hypoglycemia callout box (bordered)
    const hypoText =
      "Toy-breed puppies can be prone to hypoglycemia (low blood sugar) if meals are missed or spaced too far apart — this is the medical reason for frequent small meals. Warning signs include wobbliness, lethargy, or disorientation. Treat it as urgent: contact your vet. Meal frequency for toy breeds is a vet conversation.";
    const hypoLines = wrapText(hypoText, fontSans, 9.5, CONTENT_W - 32);
    const hypoBoxH = 34 + hypoLines.length * 14 + 12;

    page.drawRectangle({
      x: MARGIN_X,
      y: y - hypoBoxH,
      width: CONTENT_W,
      height: hypoBoxH,
      color: C_TINT,
      borderColor: C_BORDER_DARK,
      borderWidth: 1.4,
    });
    page.drawText("IMPORTANT · HYPOGLYCEMIA (LOW BLOOD SUGAR) IN TOY BREEDS", {
      x: MARGIN_X + 16,
      y: y - 18,
      font: fontSansBold,
      size: 8.5,
      color: C_INK,
    });
    drawParagraph(page, hypoText, MARGIN_X + 16, y - 35, {
      font: fontSans,
      size: 9.5,
      lineHeight: 14,
      maxWidth: CONTENT_W - 32,
      color: C_INK,
    });

    y -= hypoBoxH + 20;

    drawBottomSection(
      page,
      [
        "Water: offer freely during the day; never restrict water as a training shortcut. Ask your vet about evening water timing.",
        "Full guide: dogplanlab.com/puppy-schedule/ (small-breed section)",
      ],
      "If your puppy seems wobbly, lethargic, or disoriented, contact your veterinarian promptly.",
      y
    );
  }

  // =========================================================================
  // PAGE 8 — 7-Day Potty Tracker & Accident Log (Spread Part 1: Daily Grid)
  // =========================================================================
  {
    const page = pdfDoc.addPage([PAGE_W, PAGE_H]);
    drawPageChrome(page, 8, {
      categoryLabel: "WEEKLY TRACKER SPREAD (PART 1 OF 2) · PRINT FRESH EACH WEEK",
    });

    let y = drawPageHeading(
      page,
      "7-Day Potty Tracker & Accident Log",
      "Log for a week. The pattern appears — you'll start seeing it too."
    );

    // Week of write-in
    page.drawText("Week starting:", {
      x: PAGE_W - MARGIN_X - 165,
      y: PAGE_H - 64,
      font: fontSansBold,
      size: 8.5,
      color: C_SOFT,
    });
    addInteractiveTextField(page, "p8_week_starting", PAGE_W - MARGIN_X - 98, PAGE_H - 68, 98, 16, {
      drawUnderline: true,
      fontSize: 9,
    });

    // Instructions box
    const instBoxH = 66;
    page.drawRectangle({
      x: MARGIN_X,
      y: y - instBoxH,
      width: CONTENT_W,
      height: instBoxH,
      color: C_TINT,
      borderColor: C_BORDER_DARK,
      borderWidth: 0.8,
    });
    page.drawText("HOW TO USE THIS TRACKER", {
      x: MARGIN_X + 12,
      y: y - 14,
      font: fontSansBold,
      size: 8,
      color: C_SOFT,
    });
    const instList = [
      "1. Mark every outside trip: time, P (pee), Po (poop), or A (accident inside).",
      "2. Note what happened right before: W (woke up), M (meal), P (play), number = hours since last trip.",
      "3. After 3–4 days, circle your puppy's personal post-meal poop window.",
    ];
    let iy = y - 28;
    for (const line of instList) {
      page.drawText(line, {
        x: MARGIN_X + 12,
        y: iy,
        font: fontSans,
        size: 8.8,
        color: C_INK,
      });
      iy -= 14;
    }
    y -= instBoxH + 12;

    // Tracker table (7 columns = days, rows = time blocks)
    const timeColW = 62;
    const dayColW = (CONTENT_W - timeColW) / 7; // ~66 pt each
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const timeBlocks = ["6–9 AM", "9–12 PM", "12–3 PM", "3–6 PM", "6–9 PM", "Night"];
    const headerH = 24;
    const blockRowH = 74;

    // Table header
    page.drawRectangle({
      x: MARGIN_X,
      y: y - headerH,
      width: CONTENT_W,
      height: headerH,
      color: C_TINT,
      borderColor: C_BORDER_DARK,
      borderWidth: 0.9,
    });
    page.drawText("Time", {
      x: MARGIN_X + 8,
      y: y - 16,
      font: fontSansBold,
      size: 9,
      color: C_INK,
    });
    days.forEach((day, dIdx) => {
      const dx = MARGIN_X + timeColW + dIdx * dayColW;
      page.drawLine({
        start: { x: dx, y },
        end: { x: dx, y: y - headerH },
        thickness: 0.6,
        color: C_BORDER_DARK,
      });
      const dw = fontSansBold.widthOfTextAtSize(day, 9);
      page.drawText(day, {
        x: dx + (dayColW - dw) / 2,
        y: y - 16,
        font: fontSansBold,
        size: 9,
        color: C_INK,
      });
    });
    y -= headerH;

    timeBlocks.forEach((blockLabel, rIdx) => {
      page.drawRectangle({
        x: MARGIN_X,
        y: y - blockRowH,
        width: CONTENT_W,
        height: blockRowH,
        color: C_WHITE,
        borderColor: C_BORDER_DARK,
        borderWidth: 0.6,
      });
      // Left time-block cell tint
      page.drawRectangle({
        x: MARGIN_X,
        y: y - blockRowH,
        width: timeColW,
        height: blockRowH,
        color: C_TINT_ALT,
        borderColor: C_BORDER_DARK,
        borderWidth: 0.6,
      });
      page.drawText(blockLabel, {
        x: MARGIN_X + 6,
        y: y - blockRowH / 2 - 3,
        font: fontSansBold,
        size: 8.6,
        color: C_INK,
      });

      days.forEach((day, cIdx) => {
        const cx = MARGIN_X + timeColW + cIdx * dayColW;
        page.drawLine({
          start: { x: cx, y },
          end: { x: cx, y: y - blockRowH },
          thickness: 0.5,
          color: C_BORDER,
        });
        // Subtle writing guide lines inside cell for hand printing
        page.drawLine({
          start: { x: cx + 4, y: y - 25 },
          end: { x: cx + dayColW - 4, y: y - 25 },
          thickness: 0.3,
          color: C_BORDER,
        });
        page.drawLine({
          start: { x: cx + 4, y: y - 49 },
          end: { x: cx + dayColW - 4, y: y - 49 },
          thickness: 0.3,
          color: C_BORDER,
        });

        const tf = form.createTextField(`p8_tracker_${rIdx}_${cIdx}`);
        tf.enableMultiline();
        tf.addToPage(page, {
          x: cx + 2,
          y: y - blockRowH + 2,
          width: dayColW - 4,
          height: blockRowH - 4,
          borderWidth: 0,
        });
        tf.setFontSize(8);
      });

      y -= blockRowH;
    });

    // Key printed under the table
    y -= 14;
    const keyCopy =
      "Key:  P = pee outside  ·  Po = poop outside  ·  A = accident inside  ·  W/M/P = what happened before.";
    page.drawText(keyCopy, {
      x: MARGIN_X,
      y,
      font: fontSansBold,
      size: 8.8,
      color: C_INK,
    });
    drawRichLine(page, "(Continued on Page 9: Accident Log & Weekly Review →)", MARGIN_X, y - 14, {
      font: fontSansItalic,
      size: 8.4,
      color: C_SOFT,
    });

    drawBottomSection(
      page,
      [],
      "A tracking tool, not a medical device. Frequent accidents despite a consistent routine for a week+ — or straining, very frequent small-amount urination, or blood — warrant a vet check.",
      y - 26
    );
  }

  // =========================================================================
  // PAGE 9 — 7-Day Potty Tracker & Accident Log (Spread Part 2: Accident Log & Weekly Review)
  // =========================================================================
  {
    const page = pdfDoc.addPage([PAGE_W, PAGE_H]);
    drawPageChrome(page, 9, {
      categoryLabel: "WEEKLY TRACKER SPREAD (PART 2 OF 2) · ACCIDENT LOG & REVIEW",
    });

    let y = drawPageHeading(
      page,
      "7-Day Potty Tracker & Accident Log",
      "Log for a week. The pattern appears — you'll start seeing it too."
    );

    page.drawText("ACCIDENT LOG", {
      x: MARGIN_X,
      y,
      font: fontSansBold,
      size: 9,
      color: C_INK,
    });
    page.drawText(
      "Every indoor accident goes here — not to grade yourself, but to spot the trigger that preceded it.",
      {
        x: MARGIN_X + 82,
        y,
        font: fontSans,
        size: 8.6,
        color: C_SOFT,
      }
    );
    y -= 10;

    // Columns: Day | Time | Where | What happened before? | What I'll change
    const accCols = [
      { title: "Day", width: 58 },
      { title: "Time", width: 68 },
      { title: "Where", width: 92 },
      { title: "What happened before?", width: 152 },
      { title: "What I'll change", width: CONTENT_W - (58 + 68 + 92 + 152) },
    ];
    const accHeaderH = 24;
    const accRowH = 42;
    const numAccRows = 8;

    page.drawRectangle({
      x: MARGIN_X,
      y: y - accHeaderH,
      width: CONTENT_W,
      height: accHeaderH,
      color: C_TINT,
      borderColor: C_BORDER_DARK,
      borderWidth: 0.9,
    });

    let curColX = MARGIN_X;
    accCols.forEach((col, cIdx) => {
      if (cIdx > 0) {
        page.drawLine({
          start: { x: curColX, y },
          end: { x: curColX, y: y - accHeaderH },
          thickness: 0.6,
          color: C_BORDER_DARK,
        });
      }
      page.drawText(col.title, {
        x: curColX + 6,
        y: y - 16,
        font: fontSansBold,
        size: 8.6,
        color: C_INK,
      });
      curColX += col.width;
    });
    y -= accHeaderH;

    for (let r = 0; r < numAccRows; r++) {
      const bg = r % 2 === 1 ? C_TINT_ALT : C_WHITE;
      page.drawRectangle({
        x: MARGIN_X,
        y: y - accRowH,
        width: CONTENT_W,
        height: accRowH,
        color: bg,
        borderColor: C_BORDER,
        borderWidth: 0.5,
      });

      let cx = MARGIN_X;
      accCols.forEach((col, cIdx) => {
        if (cIdx > 0) {
          page.drawLine({
            start: { x: cx, y },
            end: { x: cx, y: y - accRowH },
            thickness: 0.5,
            color: C_BORDER,
          });
        }
        const tf = form.createTextField(`p9_accident_r${r}_c${cIdx}`);
        tf.enableMultiline();
        tf.addToPage(page, {
          x: cx + 3,
          y: y - accRowH + 3,
          width: col.width - 6,
          height: accRowH - 6,
          borderWidth: 0,
        });
        tf.setFontSize(8.5);
        cx += col.width;
      });
      y -= accRowH;
    }

    y -= 20;

    // Weekly review box (checkboxes + fillable blanks)
    const revBoxH = 128;
    page.drawRectangle({
      x: MARGIN_X,
      y: y - revBoxH,
      width: CONTENT_W,
      height: revBoxH,
      color: C_TINT,
      borderColor: C_BORDER_DARK,
      borderWidth: 1,
    });
    page.drawText("WEEKLY REVIEW (END OF WEEK)", {
      x: MARGIN_X + 14,
      y: y - 18,
      font: fontSansBold,
      size: 8.8,
      color: C_INK,
    });

    // Item 1: ☐ "My puppy's post-meal poop window is about _____ minutes."
    let ry = y - 42;
    addInteractiveCheckbox(page, "p9_review_chk_1", MARGIN_X + 14, ry - 2, 11);
    const r1Part1 = "My puppy's post-meal poop window is about ";
    page.drawText(r1Part1, {
      x: MARGIN_X + 32,
      y: ry,
      font: fontSans,
      size: 9.5,
      color: C_INK,
    });
    const r1w = fontSans.widthOfTextAtSize(r1Part1, 9.5);
    addInteractiveTextField(page, "p9_review_poop_window", MARGIN_X + 32 + r1w, ry - 2, 56, 16, {
      drawUnderline: true,
      fontSize: 9.5,
    });
    page.drawText(" minutes.", {
      x: MARGIN_X + 32 + r1w + 58,
      y: ry,
      font: fontSans,
      size: 9.5,
      color: C_INK,
    });

    // Item 2: ☐ "Accidents happen most often when: __________________."
    ry -= 32;
    addInteractiveCheckbox(page, "p9_review_chk_2", MARGIN_X + 14, ry - 2, 11);
    const r2Part1 = "Accidents happen most often when: ";
    page.drawText(r2Part1, {
      x: MARGIN_X + 32,
      y: ry,
      font: fontSans,
      size: 9.5,
      color: C_INK,
    });
    const r2w = fontSans.widthOfTextAtSize(r2Part1, 9.5);
    addInteractiveTextField(
      page,
      "p9_review_accidents_when",
      MARGIN_X + 32 + r2w,
      ry - 2,
      CONTENT_W - 48 - r2w,
      16,
      { drawUnderline: true, fontSize: 9.5 }
    );

    // Item 3: ☐ "Next week's one change: __________________."
    ry -= 32;
    addInteractiveCheckbox(page, "p9_review_chk_3", MARGIN_X + 14, ry - 2, 11);
    const r3Part1 = "Next week's one change: ";
    page.drawText(r3Part1, {
      x: MARGIN_X + 32,
      y: ry,
      font: fontSans,
      size: 9.5,
      color: C_INK,
    });
    const r3w = fontSans.widthOfTextAtSize(r3Part1, 9.5);
    addInteractiveTextField(
      page,
      "p9_review_next_change",
      MARGIN_X + 32 + r3w,
      ry - 2,
      CONTENT_W - 48 - r3w,
      16,
      { drawUnderline: true, fontSize: 9.5 }
    );

    y -= revBoxH + 14;

    drawBottomSection(
      page,
      ["Full guide: dogplanlab.com/potty-training/schedule/"],
      "A tracking tool, not a medical device. Frequent accidents despite a consistent routine for a week+ — or straining, very frequent small-amount urination, or blood — warrant a vet check.",
      y
    );
  }

  // =========================================================================
  // PAGE 10 — Bedtime Routine Checklist
  // =========================================================================
  {
    const page = pdfDoc.addPage([PAGE_W, PAGE_H]);
    drawPageChrome(page, 10, { categoryLabel: "EVENING & NIGHTS · BEDTIME CHECKLIST" });

    let y = drawPageHeading(
      page,
      "Bedtime Routine Checklist",
      "The last 90 minutes, in order. Calm evenings make calm nights."
    );

    // Blank "Our bedtime: _____" write-in at top
    page.drawRectangle({
      x: MARGIN_X,
      y: y - 36,
      width: CONTENT_W,
      height: 36,
      color: C_TINT,
      borderColor: C_BORDER_DARK,
      borderWidth: 0.9,
    });
    page.drawText("Our bedtime:", {
      x: MARGIN_X + 14,
      y: y - 22,
      font: fontSansBold,
      size: 10,
      color: C_INK,
    });
    addInteractiveTextField(page, "p10_our_bedtime", MARGIN_X + 86, y - 25, 110, 18, {
      drawUnderline: true,
      fontSize: 10,
    });
    page.drawText("(Shift the times below to match your household's actual bedtime)", {
      x: MARGIN_X + 210,
      y: y - 22,
      font: fontSansItalic,
      size: 8.6,
      color: C_SOFT,
    });
    y -= 54;

    const bedtimeSteps = [
      ["7:00 PM — Potty.", "Last big play session ends; outside trip."],
      [
        "7:15 PM — Wind-down begins.",
        "Lower the energy in the house: dim lights, calm voices, chew toy instead of fetch.",
      ],
      [
        "7:30 PM — Final water check.",
        "(Ask your vet about evening water timing for your puppy.)",
      ],
      ["8:00 PM — Quiet together time.", "Couch, crate nearby, boring is good."],
      [
        '8:30 PM — "Last call."',
        "Final outside trip: same time nightly, no play, minimal talking, straight back inside.",
      ],
      [
        "9:00 PM — Bedtime.",
        "Crate or pen, familiar blanket, white noise if it helps.",
      ],
      [
        "Overnight (if needed).",
        "Young puppies may need overnight outings — keep any trip as dull as possible: no play, minimal talking, straight back to bed.",
      ],
    ];

    bedtimeSteps.forEach(([boldLead, desc], idx) => {
      const boxH = 54;
      const bg = idx % 2 === 1 ? C_TINT_ALT : C_WHITE;
      page.drawRectangle({
        x: MARGIN_X,
        y: y - boxH,
        width: CONTENT_W,
        height: boxH,
        color: bg,
        borderColor: C_BORDER,
        borderWidth: 0.6,
      });

      addInteractiveCheckbox(page, `p10_bedtime_chk_${idx + 1}`, MARGIN_X + 14, y - 23, 12);

      page.drawText(boldLead, {
        x: MARGIN_X + 36,
        y: y - 19,
        font: fontSansBold,
        size: 10,
        color: C_INK,
      });

      drawParagraph(page, desc, MARGIN_X + 36, y - 34, {
        font: fontSans,
        size: 9.2,
        lineHeight: 13,
        maxWidth: CONTENT_W - 50,
        color: C_SOFT,
      });

      y -= boxH + 6;
    });

    drawBottomSection(
      page,
      [
        "Many puppies begin sleeping longer stretches around 4–5 months. It's puppy-led, not trained.",
        "Full guide: dogplanlab.com/puppy-schedule/evening-routine/",
      ],
      "",
      y - 10
    );
  }

  // =========================================================================
  // PAGE 11 — What Changes as Your Puppy Gets Older
  // =========================================================================
  {
    const page = pdfDoc.addPage([PAGE_W, PAGE_H]);
    drawPageChrome(page, 11, { categoryLabel: "4-MONTH ROADMAP · DEVELOPMENTAL PROGRESSION" });

    let y = drawPageHeading(
      page,
      "What Changes as Your Puppy Gets Older",
      "The loop never changes. The spacing inside it does."
    );

    // Reference table: Age | Meals/day | Potty breaks (awake) | Naps | What's new
    const cols = [
      { title: "Age", width: 76 },
      { title: "Meals/day", width: 84 },
      { title: "Potty breaks (awake)", width: 132 },
      { title: "Naps", width: 76 },
      { title: "What's new", width: CONTENT_W - (76 + 84 + 132 + 76) },
    ];
    const headerH = 24;

    page.drawRectangle({
      x: MARGIN_X,
      y: y - headerH,
      width: CONTENT_W,
      height: headerH,
      color: C_TINT,
      borderColor: C_BORDER_DARK,
      borderWidth: 0.9,
    });
    let cx = MARGIN_X;
    cols.forEach((c, idx) => {
      if (idx > 0) {
        page.drawLine({
          start: { x: cx, y },
          end: { x: cx, y: y - headerH },
          thickness: 0.6,
          color: C_BORDER_DARK,
        });
      }
      page.drawText(c.title, {
        x: cx + 6,
        y: y - 16,
        font: fontSansBold,
        size: 8.6,
        color: C_INK,
      });
      cx += c.width;
    });
    y -= headerH;

    const p11Rows = [
      [
        "8–10 weeks",
        "3–4",
        "After every wake, meal, play + every 1–2 hrs",
        "4+ short naps",
        'Everything is new; you\'re "on shift"',
      ],
      [
        "10–12 weeks",
        "3–4",
        "Slightly longer gaps",
        "3–4 naps",
        "5-min training clicks; 2nd vaccine window",
      ],
      [
        "12–16 weeks",
        "3–4 → 3 (transition)",
        "Gradually longer gaps",
        "2–3 naps",
        "Teething (~12–16 wks); ask vet about 4→3 meals",
      ],
      [
        "4–6 months",
        "2–3",
        "Longer gaps; reliability-based",
        "1–2 rests",
        "Longer training sessions; 3→2 meals ~6 months",
      ],
    ];

    p11Rows.forEach((row, rIdx) => {
      const rH = 44;
      const bg = rIdx % 2 === 1 ? C_TINT_ALT : C_WHITE;
      page.drawRectangle({
        x: MARGIN_X,
        y: y - rH,
        width: CONTENT_W,
        height: rH,
        color: bg,
        borderColor: C_BORDER,
        borderWidth: 0.5,
      });

      let rx = MARGIN_X;
      row.forEach((cellText, cIdx) => {
        const colW = cols[cIdx].width;
        if (cIdx > 0) {
          page.drawLine({
            start: { x: rx, y },
            end: { x: rx, y: y - rH },
            thickness: 0.5,
            color: C_BORDER,
          });
        }
        drawParagraph(page, cellText, rx + 6, y - 15, {
          font: cIdx === 0 ? fontSansBold : fontSans,
          size: 8.6,
          lineHeight: 12.5,
          maxWidth: colW - 12,
          color: C_INK,
        });
        rx += colW;
      });
      y -= rH;
    });

    y -= 14;
    page.drawText("Typical patterns — your puppy's actual day is the real guide, not this table.", {
      x: MARGIN_X,
      y,
      font: fontSansItalic,
      size: 8.8,
      color: C_SOFT,
    });

    y -= 28;

    // Milestone checkboxes
    const mileBoxH = 136;
    page.drawRectangle({
      x: MARGIN_X,
      y: y - mileBoxH,
      width: CONTENT_W,
      height: mileBoxH,
      color: C_TINT,
      borderColor: C_BORDER_DARK,
      borderWidth: 0.9,
    });
    page.drawText("MILESTONE CHECKLIST (CHECK OFF AS YOUR PUPPY GROWS)", {
      x: MARGIN_X + 14,
      y: y - 18,
      font: fontSansBold,
      size: 8.5,
      color: C_SOFT,
    });

    const milestones = [
      "Sleeping longer stretches at night (~4–5 months for many puppies)",
      "Down to 3 meals (sometime in the 3–6 month window, vet-guided)",
      "Teething winding down, adult teeth settling (~6 months)",
      "Reliably signaling to go out",
    ];

    let my = y - 40;
    milestones.forEach((mText, idx) => {
      addInteractiveCheckbox(page, `p11_milestone_chk_${idx + 1}`, MARGIN_X + 14, my - 2, 12);
      drawRichLine(page, mText, MARGIN_X + 34, my, {
        font: fontSans,
        size: 9.8,
        color: C_INK,
      });
      my -= 24;
    });

    y -= mileBoxH + 20;

    drawBottomSection(
      page,
      [
        "Ranges, not rules. Your puppy's signals and your vet's guidance beat any chart.",
        "Full guide: dogplanlab.com/puppy-schedule/by-age/",
      ],
      "General developmental patterns. Vaccine and feeding-transition timing: confirm with your vet.",
      y
    );
  }

  // =========================================================================
  // PAGE 12 — Make It Yours
  // =========================================================================
  {
    const page = pdfDoc.addPage([PAGE_W, PAGE_H]);
    drawPageChrome(page, 12, { categoryLabel: "HOUSEHOLD PROFILE · PERSONALIZATION SHEET" });

    let y = drawPageHeading(
      page,
      "Make It Yours",
      "Fill this in, stick it on the fridge next to the chart."
    );

    // Card container for household fields
    const cardH = 485;
    page.drawRectangle({
      x: MARGIN_X,
      y: y - cardH,
      width: CONTENT_W,
      height: cardH,
      color: C_WHITE,
      borderColor: C_BORDER_DARK,
      borderWidth: 1.1,
    });

    let fy = y - 34;
    const labelX = MARGIN_X + 20;
    const fieldRightX = PAGE_W - MARGIN_X - 20;

    function addFullRowField(label, fieldName, rowY, { hint = "" } = {}) {
      page.drawText(label, {
        x: labelX,
        y: rowY,
        font: fontSansBold,
        size: 10.5,
        color: C_INK,
      });
      const lw = fontSansBold.widthOfTextAtSize(label, 10.5);
      const fx = labelX + lw + 10;
      const fw = fieldRightX - fx;
      addInteractiveTextField(page, fieldName, fx, rowY - 3, fw, 20, {
        drawUnderline: true,
        fontSize: 10.5,
      });
      if (hint) {
        page.drawText(hint, {
          x: fx,
          y: rowY - 16,
          font: fontSansItalic,
          size: 8.4,
          color: C_MUTED,
        });
      }
    }

    addFullRowField("Puppy's name:", "p12_puppy_name", fy);
    fy -= 52;

    addFullRowField("Breed / expected adult size:", "p12_breed_size", fy);
    fy -= 52;

    addFullRowField("Gotcha day:", "p12_gotcha_day", fy);
    fy -= 52;

    addFullRowField("Our wake time:", "p12_wake_time", fy);
    fy -= 54;

    // Meal times (4 blanks)
    page.drawText("Meal times:", {
      x: labelX,
      y: fy,
      font: fontSansBold,
      size: 10.5,
      color: C_INK,
    });
    const mStartX = labelX + 74;
    const mSlotW = 92;
    const mGap = 12;
    for (let i = 0; i < 4; i++) {
      const mx = mStartX + i * (mSlotW + mGap);
      addInteractiveTextField(page, `p12_meal_time_${i + 1}`, mx, fy - 3, mSlotW, 20, {
        drawUnderline: true,
        fontSize: 10.5,
      });
      page.drawText(`Meal ${i + 1}`, {
        x: mx + 2,
        y: fy - 15,
        font: fontSans,
        size: 7.5,
        color: C_MUTED,
      });
    }
    fy -= 58;

    addFullRowField("Vet name + number:", "p12_vet_name_number", fy);
    fy -= 52;

    addFullRowField("Emergency vet number:", "p12_emergency_vet_number", fy);
    fy -= 52;

    // Our one rule for the whole household (2 lines for roomy writing)
    const ruleLabel = "Our one rule for the whole household:";
    page.drawText(ruleLabel, {
      x: labelX,
      y: fy,
      font: fontSansBold,
      size: 10.5,
      color: C_INK,
    });
    page.drawText('(e.g., "everyone uses the same potty spot")', {
      x: labelX + fontSansBold.widthOfTextAtSize(ruleLabel, 10.5) + 8,
      y: fy,
      font: fontSansItalic,
      size: 8.8,
      color: C_MUTED,
    });
    addInteractiveTextField(
      page,
      "p12_household_rule",
      labelX,
      fy - 34,
      fieldRightX - labelX,
      24,
      { drawUnderline: true, fontSize: 10.5 }
    );

    y -= cardH + 34;

    // Closing line box
    page.drawRectangle({
      x: MARGIN_X + 24,
      y: y - 48,
      width: CONTENT_W - 48,
      height: 48,
      color: C_TINT,
      borderColor: C_BORDER_DARK,
      borderWidth: 0.9,
    });
    const closingQuote =
      '"You know more than you think you do. The fact that you printed this proves it." — DogPlanLab';
    const cqW = fontSerifItalic.widthOfTextAtSize(closingQuote, 11);
    page.drawText(closingQuote, {
      x: (PAGE_W - cqW) / 2,
      y: y - 28,
      font: fontSerifItalic,
      size: 11,
      color: C_INK,
    });
  }

  const pdfBytes = await pdfDoc.save();
  const outPath = path.join(process.cwd(), "public", "downloads", "Puppy-Schedule-Starter-Kit.pdf");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, pdfBytes);

  const fields = form.getFields();
  console.log(
    `Generated ${pdfDoc.getPageCount()}-page PDF (${pdfBytes.length} bytes) with ${fields.length} interactive fillable fields at: ${outPath}`
  );
}

buildStarterKitPdf().catch((err) => {
  console.error("Failed to generate Starter Kit PDF:", err);
  process.exit(1);
});
