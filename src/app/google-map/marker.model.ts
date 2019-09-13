export class Marker {
  public lat: number;
  public lng: number;

  public title: string;
  public type: string;

  public image: string;
  
  constructor(lat: number, lng: number, title: string, type: string = "default") {
    this.lat = lat;
    this.lng = lng;

    this.title = title;
    this.type = type;

    switch (type) {
      case 'job':
        this.image = 'https://img.icons8.com/nolan/64/000000/marker.png';
        break;
      case 'consult':
        this.image = 'https://img.icons8.com/ios/50/000000/consultation.png';
        break;
      case 'help':
        this.image = 'https://img.icons8.com/ios-filled/50/000000/question-mark.png';
        break;
    
      default:
        this.image = '';
        break;
    }
  }
}