export class Marker {
  public lat: string;
  public lng: string;

  public title: string;
  public type: string;

  public image: string;
  
  constructor(lat: string, lng: string, title: string, type: string) {
    this.lat = lat.toString();
    this.lng = lng.toString();

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
        this.image = 'https://static.thenounproject.com/png/1221847-200.png';
        break;
    }
  }
}