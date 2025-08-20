const apiKey = "QUxMIFIPVVVgQkFTRSBBBUkUgQkVMTD5HIFRPIFVFT"; // यह आपकी API कुंजी है
const apiUrl = "https://stock.indianapi.in/live-data"; // यह API का सही एंडपॉइंट होगा

async function fetchStockData() {
    try {
        const response = await fetch(apiUrl, {
            headers: {
                "x-api-key": apiKey,
            },
        });

        if (!response.ok) {
            throw new Error("Data not available");
        }

        const data = await response.json();
        console.log(data); // डेटा को कंसोल में देखें
        // यहाँ आप HTML तत्वों को अपडेट करने के लिए कोड लिखेंगे
    } catch (error) {
        console.error("Error fetching data:", error);
        // यहाँ आप "data unavailable" संदेश प्रदर्शित करेंगे
    }
}

fetchStockData();
