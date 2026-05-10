export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // The Google Apps Script Web App URL must be stored in Vercel Environment Variables
  const SHEET_URL = process.env.SHEET_URL;

  if (!SHEET_URL) {
    console.error("Missing SHEET_URL environment variable.");
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const response = await fetch(SHEET_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body)
    });

    if (!response.ok) {
      throw new Error(`Google Apps Script responded with ${response.status}`);
    }

    return res.status(200).json({ status: "success" });
  } catch (error) {
    console.error("Error submitting to Google Sheets:", error);
    return res.status(500).json({ error: "Failed to submit data" });
  }
}
