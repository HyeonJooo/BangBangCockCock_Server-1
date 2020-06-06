const pool = require('../modules/pool');
const table = "concert";
const likeTable = "likes";
const concerts = {
    getBanner : async() =>{
        const query = `SELECT concert_title,concert_date,concert_image,concert_category FROM ${table} order by rand() limit 1`;
        try{
            const result = await pool.queryParam(query);
            return result;
        }catch(err){
            console.log('getBanner err'+err);
            throw err;
        }
    },
    getManyLikesConcert: async() =>{
        const manyLikeQuery = `select concertIdx ,COUNT(concertIdx) as cnt from ${table} natural join ${likeTable} group by concertIdx order by cnt desc;`
        const query2 = ``
        try{
            const result = await pool.queryParam(query);
            console.log(result);
            return result;
        }catch(err){
            console.log('getManyLikesConcert err'+ err);
            throw err;
        }
    },
    isConcertIdx: async (concertIdx) =>{
        const query = `select concertIdx from ${table} where concertIdx ="${concertIdx}"`;
        try{
            const result = await pool.queryParam(query);
            if(result.length >0){
                return true;
            }else return false;
        }catch(err){
            console.log('isConcertIdx err'+err);
            throw err;
        }
    }
}

module.exports = concerts;