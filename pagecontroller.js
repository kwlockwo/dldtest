
const axios = require("axios");

const puppeteer = require("puppeteer");

const showhomepage = async (req, res) => {

  
      res.render("index");
    // }
  };


  
const twitterpost = async (req, res) => {
    const url = req.body.url;
    console.log("u r here top================================================");
    console.log(url);
  
    if (!url) {
      const error = ErrorHandler.validationError("Please provide a valid URL!");
      return res.status(error.status).json({ message: error.message });
    }
    const tweetUrl = url;
    // console.log("Executable Path:", puppeteer.executablePath());
    try {
      const getVideoUrl = async (tweetUrl) => {
        // const browser = await puppeteer.launch();
        const browser = await puppeteer.launch({
          headless: true,
          args: [
            "--disable-setuid-sandbox",
            "--no-sandbox",
            "--single-process",
            "--no-zygote",
          ],
          executablePath:
            process.env.NODE_ENV === "production"
              ? process.env.PUPPETEER_EXECUTABLE_PATH
              : puppeteer.executablePath(),
        });
  
        const page = await browser.newPage();
        // await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36');
  
        try {
          // await page.goto(tweetUrl);
          await page.goto(tweetUrl, { timeout: 90000 }); // Timeout set to 10 seconds (10,000 milliseconds)
  
          // await page.waitForSelector("video");
          await page.waitForSelector("video", { timeout: 90000 }); // Timeout set to 5 seconds (5,000 milliseconds)
  
          const tweetData = await page.evaluate(
            () => {
              const videoElement = document.querySelector("video");
    
              return {
                videoUrl: videoElement.src,
              };
            },
            { timeout: 90000 } // Timeout set to 90 seconds (90,000 milliseconds)
          );
          console.log(tweetData);
  
          return tweetData.videoUrl;
        } catch (error) {
          console.error("Error:", error);
        } finally {
          await browser.close();
        }
      };
  
      const videoUrl = await getVideoUrl(tweetUrl);
  
  
    // res.render("index", {
    //     title: "Twitterpage",

    //   });
  
      ////////
  
      if (videoUrl) {
        // Instead of downloading the video, send the video URL to the client
        //  console.log("outside getVideoUrl function",videoUrl);
        // handleFormSubmit(videoUrl, res);
        res.json({ videoUrl: videoUrl });
        // res.render("twitterpage", {
        //   title: "Twitterpage",
       
        // });
      } else {
        res.status(404).json({ error: "Video URL not found." });
      }
    } catch (err) {
      console.log(err);
  
      const error = ErrorHandler.validationError(
        "Invalid URL or Twitter/User imposed some restriction"
      );
      return res.status(error.status).json({ message: error.message });
    }
  };
  

 module.exports = { showhomepage,twitterpost  };
