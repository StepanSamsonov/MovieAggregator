import globals from '../../globals';


const genres = {
    async getAll(page, filters) {
        const url = `${globals.url}/genre?` + (page ? `page=${page}` : '');
        const res = await fetch(globals.transformToQuery(url, filters));
        return await res.json();
    },

    async getOne(id) {
        const res = await fetch(`${globals.url}/genre/${id}/`);
        return await res.json();
    }
};

export default genres;
