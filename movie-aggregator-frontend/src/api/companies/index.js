import globals from '../../globals';

const companies = {
    async getAll(page, filters) {
        let url = `${globals.url}/company?` + (page ? `page=${page}` : '');
        const res = await fetch(globals.transformToQuery(url, filters));
        return await res.json();
    },

    async getOne(id) {
        const res = await fetch(`${globals.url}/company/${id}/`);
        return await res.json();
    }
};

export default companies;
