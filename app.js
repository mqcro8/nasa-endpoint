import express from 'express' ;
import { idkFu, idkFu2, idkFu3 } from './test.js'

const app = express();

app.use((err, req, res, next) => {
    return res.status(500).send({error: {message:"Server error"}});    
});

app.get('/EONET', async (req, res) => {
    const lan = req.query.lan;

    try {
        const { ans } = await idkFu(lan);
        if(!ans) return res.status(400).send({error: {message:"Server error"}});
    } catch (error) {
        return res.status(400).send({error: {message:"Server error"}});
    }
    
    return res.status(200).send(ans);
})

app.get('/NeoWs', async (req, res) => {
    const lan = req.query.lan;

    try{
        const { ans } = await idkFu2(lan);
        if(!ans) return res.status(400).send({error: {message:"Server error"}});
    }
    catch(error){
        if(!ans) return res.status(400).send({error: {message:"Server error"}});
    }
    
    
    return res.status(200).send(ans);
})

app.get('/APOD', async (req, res) => {
    const lan = req.query.lan;

    try{
        const { ans } = await idkFu3(lan);
        if(!ans) return res.status(400).send({error: {message:"Server error"}});
    }
    catch(error){
        if(!ans) return res.status(400).send({error: {message:"Server error"}});
    }

    return res.status(200).send(ans);
})

app.listen(8080, () => {
    console.log(`App is running on port 8080`)
});