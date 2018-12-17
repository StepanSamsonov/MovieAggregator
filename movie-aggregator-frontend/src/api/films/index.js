import globals from '../../globals';

const films = {
    async getAll(page, filters) {
        let url = `${globals.url}/films?` + (page ? `page=${page}` : '');
        const res = await fetch(globals.transformToQuery(url, filters));

        return await res.json();
    },

    async getOne(id) {
        const res = await fetch(`${globals.url}/film/${id}/`);
        return await res.json();
    }
};

export default films;
