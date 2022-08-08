import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
import fs from "fs";
import { delay } from 'bluebird';
(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
    function sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    app.get("/filteredimage", async (req, res) => {
        console.log("----------------------------------------------------------------------------------------------------------------------");
        let url: string;
        url = req.query.image_url.toString();
        console.log(url);
        console.log("----------------------------------------------------------------------------------------------------------------------");
        if (!url) {
            res.status(404).send("ERROR 404 ------------------ URL NOT FOUND");
            console.log("ERROR 404 ------------------ URL NOT FOUND");
        }
        let filteredpath = await filterImageFromURL(url);
        res.status(200).sendFile(filteredpath);
        console.log("SUCCESS 200 ------------------ URL Request ended");
        await sleep(200);
        fs.unlinkSync(filteredpath);

 });


  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();