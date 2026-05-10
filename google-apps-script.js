// ============================================================
// TEQNIKO ENGINEERING — Google Apps Script
// Paste this in: script.google.com → New Project
// ============================================================

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    if (data.type === "enquiry") {
      // ---- SHEET 1: Enquiries ----
      var sheet1 = ss.getSheetByName("Enquiries");
      if (!sheet1) {
        sheet1 = ss.insertSheet("Enquiries");
        sheet1.appendRow([
          "Timestamp", "Query ID", "Name", "Company", "Phone",
          "Email", "City", "Products Requested", "Message",
          "Device", "Source", "Status"
        ]);
        // Style header
        sheet1.getRange(1, 1, 1, 12).setBackground("#C0201E").setFontColor("white").setFontWeight("bold");
        sheet1.setFrozenRows(1);
      }
      sheet1.appendRow([
        data.timestamp,
        data.queryId,
        data.name,
        data.company,
        data.phone,
        data.email || "",
        data.city,
        data.products,
        data.message || "",
        data.device,
        data.source,
        "New"
      ]);

    } else if (data.type === "tracking") {
      // ---- SHEET 2: Visitor Tracking ----
      var sheet2 = ss.getSheetByName("Visitor Tracking");
      if (!sheet2) {
        sheet2 = ss.insertSheet("Visitor Tracking");
        sheet2.appendRow([
          "Timestamp", "Session ID", "Event", "Page",
          "Product / Detail", "Category", "Count",
          "Email (if given)", "Phone (if given)", "Name (if given)",
          "Device", "Referrer / Source"
        ]);
        sheet2.getRange(1, 1, 1, 12).setBackground("#1A1A1A").setFontColor("white").setFontWeight("bold");
        sheet2.setFrozenRows(1);
      }
      sheet2.appendRow([
        data.timestamp,
        data.sessionId,
        data.event,
        data.page || "",
        data.product || data.products || "",
        data.category || "",
        data.count || "",
        data.email || "",
        data.phone || "",
        data.name || "",
        data.device || "",
        data.referrer || ""
      ]);
    }

    return ContentService.createTextOutput(
      JSON.stringify({ status: "success" })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: err.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function — run manually to verify sheet setup
function testSetup() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  Logger.log("Connected to: " + ss.getName());
}
