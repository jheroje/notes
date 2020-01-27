import service from '../handlers/redis.js';

const ns = 'notes';
const notesService = service(ns);

export default notesService;