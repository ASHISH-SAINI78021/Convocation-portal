const puppeteer = require('puppeteer');

const makePDF = async (alumni) => {
  const logoUrl = 'https://upload.wikimedia.org/wikipedia/en/7/75/National_Institute_of_Technology%2C_Kurukshetra_Logo.png';
  const mainImageUrl = 'https://upload.wikimedia.org/wikipedia/en/7/75/National_Institute_of_Technology%2C_Kurukshetra_Logo.png';
  const reactLogoUrl = 'https://w7.pngwing.com/pngs/452/495/png-transparent-react-javascript-angularjs-ionic-github-text-logo-symmetry-thumbnail.png';
  const backgroundUrl = 'https://ugcounselor-content.s3.ap-south-1.amazonaws.com/wp-content/uploads/2024/04/03203527/NIT-Kurukshetra.jpg';
  const venueUrl = 'https://ugcounselor-content.s3.ap-south-1.amazonaws.com/wp-content/uploads/2024/04/03203527/NIT-Kurukshetra.jpg';

  const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>19th Convocation Ceremony</title>
    <style>
        body {
            font-family: 'Georgia', serif;
            margin: 0;
            padding: 0;
            position: relative;
        }

        body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
        url('${backgroundUrl}') center center / cover no-repeat;   /* Blurred overlay */
    filter: blur(0px); /* Blurs the overlay */
    opacity: 0.4;
    z-index: -2;
}


        body::after {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
        }

        .container {
            width: 80%;
            margin: 50px auto;
            padding: 30px;
            background-color: rgba(255, 255, 255, 0.80);
            border-radius: 8px;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
            text-align: center;
            position: relative;
        }

        .logo {
            width: 130px;
            margin: 10px auto;
        }

        h1 {
            font-size: 30px;
            font-weight: bold;
            margin-top: 10px;
        }

        h2 {
            font-size: 24px;
            font-weight: 600;
            margin: 20px 0 30px 0;
        }

        .uuid {
            position: absolute;
            top: 10px;
            right: 20px;
            font-size: 16px;
            font-weight: bold;
            color: #333;
        }

        .details {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
        }

        .text-column, .value-column, .image-column {
            width: 30%;
            text-align: left;
        }

        .text-column p, .value-column p {
            font-size: 18px;
            line-height: 1.8;
            margin: 8px 0;
            font-weight: 500;
        }

        .value-column p {
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; /* Optional: adds "..." if the text overflows */
}

        .image-placeholder img {
            width: 100%;
            height: 150px;
            object-fit: contain;
            border-radius: 8px;
            margin-top: 10px;
        }

        .venue-image img {
            width: 100%;
            height: 200px;
            object-fit: cover;
            margin-top: 30px;
            border-radius: 8px;
        }

        footer {
            margin-top: 40px;
            font-style: italic;
            font-size: 18px;
            font-weight: 400;
            color: #333;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="uuid">${String(alumni?.alumniId ?? 0).padStart(4, '0')}</div>
        <img src="${logoUrl}" alt="NIT Kurukshetra Logo" class="logo">
        <h1>National Institute of Technology Kurukshetra</h1>
        <h2 style="font-family: 'Times New Roman', serif; font-weight: 400; font-style: italic; font-size: 24px;">
            welcomes you for <br><span style="font-size: 32px; font-weight: bold;">19<sup>th</sup> Convocation Ceremony</span>
        </h2>
        <div class="details">
            <div class="text-column">
                <p><strong>Student’s Name:</strong></p>
                <p><strong>Father’s Name:</strong></p>
                <p><strong>Batch:</strong></p>
                <p><strong>Branch:</strong></p>
                <p><strong>Dept.:</strong></p>
            </div>
            <div class="value-column">
                <p>${alumni.name}</p>
                <p>${alumni.fathername}</p>
                <p>${alumni.batch}</p>
                <p>${alumni.branch}</p>
                <p>${alumni.department}</p>
            </div>
            <div class="image-column">
                <div class="image-placeholder">
                    <img src="${mainImageUrl}" alt="Main Image">
                </div>
                <div class="image-placeholder" style="height: 50px;">
                    <img src="${reactLogoUrl}" alt="React Logo" style="height: 100%;">
                </div>
            </div>
        </div>
        <div class="venue-image">
            <img src="${venueUrl}" alt="Venue Image">
        </div>
        <footer>
            Let’s come together to celebrate yesterday, cherish today, and welcome tomorrow.
        </footer>
    </div>
</body>
</html>`;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set HTML content and wait until all resources load
  await page.setContent(htmlTemplate, { waitUntil: 'networkidle0' });

  // Generate PDF
  await page.pdf({
    path: './admit_card_12213082Choice2.pdf',
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  await browser.close();
  console.log('PDF Generated!');
};

makePDF();
