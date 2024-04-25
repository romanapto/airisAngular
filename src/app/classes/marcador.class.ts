// export class Marcador {
//     constructor(public lat:number, public lng: number ) {}
// }


export class Marcador {
    public lat:number; 
    public lng: number;
    public titulo='Sin Titulo';
    public desc='Sin Descripcion';
    marker: any;

    constructor(lat:number, lng: number ) {
        this.lat=lat;
        this.lng=lng;
        const marker = new google.maps.Marker({
            position: { lat, lng },
            title: "Hello World!",
          });
        this.marker=marker;  
    }
}