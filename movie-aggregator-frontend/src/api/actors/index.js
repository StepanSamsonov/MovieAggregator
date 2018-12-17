import globals from '../../globals';

const actors = {
    async getAll(page, filters) {
        const url = `${globals.url}/actor?` + (page ? `page=${page}` : '');
        const res = await fetch(globals.transformToQuery(url, filters));
        return await res.json();
    },

    async getOne(id) {
      const res = await fetch(`${globals.url}/actor/${id}/`);
      return await res.json();
    }
};

export default actors;
