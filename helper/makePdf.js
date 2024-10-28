const puppeteer = require('puppeteer');

const makePDF = async () => {
  const logoUrl = 'https://upload.wikimedia.org/wikipedia/en/7/75/National_Institute_of_Technology%2C_Kurukshetra_Logo.png';
  const mainImageUrl = 'https://upload.wikimedia.org/wikipedia/en/7/75/National_Institute_of_Technology%2C_Kurukshetra_Logo.png';
  const reactLogoUrl = 'https://w7.pngwing.com/pngs/452/495/png-transparent-react-javascript-angularjs-ionic-github-text-logo-symmetry-thumbnail.png';
  const backgroundUrl = 'https://media.collegedekho.com/media/img/news/NIT_Kurukshetra_ECE_Previous_Years_JEE_Main_Cutoff_Ranks.png?q=40&tr=w-640,h-300https://nitkkr.ac.in/wp-content/uploads/2021/08/banner-2.jpg';

  const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>19th Convocation Ceremony Invitation</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background: url("${backgroundUrl}") no-repeat center center fixed;
      background-size: cover;
    }

    .container {
      width: 80%;
      max-width: 800px;
      margin: 50px auto;
      background-color: rgba(255, 255, 255, 0.92);
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      padding: 30px;
      position: relative;
      text-align: center;
    }

    .logo {
      width: 100px;
      margin: 10px auto;
    }

    .header {
      position: relative;
      margin-bottom: 20px;
    }

    h1 {
      font-size: 28px;
      color: #333;
      margin: 0;
      text-align: center;
      position: relative;
    }

    .main-image {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      position: absolute;
      top: 0;
      right: 0;
    }

    .uuid {
      position: absolute;
      top: 10px;
      right: 10px;
      font-weight: bold;
      color: #333;
    }

    .subheading {
      font-weight: bold;
      margin-top: 10px;
      margin-bottom: 20px;
    }

    p {
      font-size: 16px;
      color: #555;
      line-height: 1.6;
      margin-bottom: 20px;
    }

    .details {
      font-size: 18px;
      font-weight: bold;
      margin: 20px 0;
    }

    .react-logo {
      width: 50px;
      margin: 20px auto;
    }

    .signature {
      margin-top: 10px;
      font-weight: bold;
      color: #888;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="uuid">UUID UNIQUE</div>
    <img src="${logoUrl}" alt="NIT Logo" class="logo">

    <div class="header">
      <h1>19th Convocation Ceremony</h1>
      <img src="${mainImageUrl}" alt="Main Visual" class="main-image">
    </div>

    <p class="subheading">National Institute of Technology, Kurukshetra</p>
    <p>Invites You to Relive Those Unforgettable Moments</p>
    <p><em>“Woh din bhi kya din the...”</em></p>
    <p>
      As we gather for the 19th Convocation Ceremony, we invite you to journey back to the days of late-night study sessions, endless laughter, unforgettable friendships, and shared dreams.
      Join us as we celebrate the success of our graduating class and relive the cherished memories that made NIT Kurukshetra our second home.
    </p>
    <p>
      Let’s come together to celebrate yesterday, cherish today, and welcome tomorrow.
    </p>
    <p class="details">
      Date: [Insert Date Here] <br>
      Time: [Insert Time Here] <br>
      Venue: NIT Kurukshetra Campus
    </p>
    <p>Be there to witness new beginnings and recall the moments that shaped our past.</p>
    <img src="${reactLogoUrl}" alt="React Logo" class="react-logo">
    <p class="signature">Student Signature</p>
  </div>
</body>
</html>
`;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set HTML content and wait until all resources load
  await page.setContent(htmlTemplate, { waitUntil: 'networkidle0' });

  // Generate PDF
  await page.pdf({
    path: './admit_card_12213082.pdf',
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  await browser.close();
  console.log('PDF Generated!');
};

makePDF();
