
class Bands {
    constructor() {
        this.bands = [];
    }

    addBand(band) {
        this.bands.push(band);
    }

    getBands() {
        return this.bands;
    }

    deleteBand(id) {
        this.bands = this.bands.filter(band => band.id !== id);
        return this.bands;
    }

    voteByBand(id = '') {
        this.bands.map(band => {
            if (band.id === id) {
                band.votes++;
                console.log(band.votes);
                return band;
            } else {
                console.log('No existe banda con id:', id);
                return band;
            }
        });
    }
}

module.exports = Bands;