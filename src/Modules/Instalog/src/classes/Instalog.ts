class Instalog {
    public SECRET_KEY: string;
    private API_URL: string = "http://localhost:5000";

    constructor (SECRET_KEY: string) {
        this.SECRET_KEY = SECRET_KEY;
    }

    createEvent = () => undefined;

    listEvents = () => undefined
}

export default Instalog;