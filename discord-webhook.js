const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  // Pastikan hanya menerima POST request
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  // Parse payload dari Discord
  const payload = JSON.parse(event.body);
  
  // Periksa apakah ini adalah PING dari Discord
  if (payload.type === 1) {
    return {
      statusCode: 200,
      body: JSON.stringify({ type: 1 }),
    };
  }

  // Logika untuk mencari data dari Google Spreadsheet atau database Anda
  const keyword = payload.data.options.find(opt => opt.name === "keyword")?.value;
  let responseContent = "Data tidak ditemukan untuk keyword tersebut.";
  if (keyword === 'arthur') {
    responseContent = {
      content: `**Talent Found**: ${keyword}`,
      embeds: [{
        title: `Image for ${keyword}`,
        image: { url: "https://example.com/arthur-image.jpg" } // Ganti dengan URL gambar yang sesuai
      }]
    };
  }

  // Kirim balasan ke Discord webhook
  const webhookUrl = 'https://discord.com/api/webhooks/123456789012345678/abcdefghijklmnopqrstuvwxyz'; // Ganti dengan webhook URL Anda
  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(responseContent),
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ type: 4, data: { content: "Command diterima!" } }),
  };
};
