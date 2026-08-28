const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

function formatDate(dateString) {
  if (!dateString || dateString.length !== 8) {
    return null;
  }

  const year = Number(dateString.substring(0, 4));
  const month = Number(dateString.substring(4, 6));
  const day = Number(dateString.substring(6, 8));

  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

app.get("/", (req, res) => {
  res.redirect("/api/enrollment");
});

app.get("/api/enrollment", (req, res) => {
  try {
    const filePath = path.join(__dirname, "data", "enrollment.json");
    const fileData = fs.readFileSync(filePath, "utf8");
    const enrollmentData = JSON.parse(fileData);

    const district = req.query.district;

    let normalizedData = enrollmentData.map((record) => {
      return {
        ...record,
        enrollDate: formatDate(record.enrollDate),
        elLevel:
          record.elLevel && record.elLevel.trim() !== ""
            ? record.elLevel
            : null,
      };
    });

    if (district) {
      normalizedData = normalizedData.filter((record) => {
        return (
          record.district.trim().toLowerCase() ===
          district.trim().toLowerCase()
        );
      });

      if (normalizedData.length === 0) {
        return res.status(404).json({
          message: "No enrollment records found for that district.",
        });
      }
    }

    res.json(normalizedData);
  } catch (error) {
    console.error("Error reading enrollment data:", error.message);

    res.status(500).json({
      message: "Unable to load enrollment data.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});