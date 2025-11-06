import { getShortUrl } from "../dao/short_url.js"
import { createShortUrlWithoutUser, createShortUrlWithUser } from "../services/short_url.service.js"
import wrapAsync from "../utils/tryCatchWrapper.js"

export const createShortUrl = wrapAsync(async (req,res)=>{
    try {
        const data = req.body
        console.log("Received request body:", data);
        let shortUrl
        if(req.user){
            shortUrl = await createShortUrlWithUser(data.url,req.user._id,data.slug)
        }else{  
            shortUrl = await createShortUrlWithoutUser(data.url)
        }
        res.status(200).json({shortUrl : process.env.APP_URL + shortUrl})
    } catch (error) {
        console.error("Error in createShortUrl:", error);
        res.status(500).json({ error: error.message });
    }
})


export const redirectFromShortUrl = wrapAsync(async (req,res)=>{
    const {id} = req.params
    const url = await getShortUrl(id)
    if(!url) throw new Error("Short URL not found")
    res.redirect(url.full_url)
})

export const createCustomShortUrl = wrapAsync(async (req,res)=>{
    const {url,slug} = req.body
    const shortUrl = await createShortUrlWithoutUser(url,customUrl)
    res.status(200).json({shortUrl : process.env.APP_URL + shortUrl})
})