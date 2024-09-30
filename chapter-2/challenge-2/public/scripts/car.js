class Car {
  static list = [];

  static init(cars) {
    this.list = cars.map((i) => new this(i));
  }

  constructor({
    id,
    plate,
    manufacture,
    model,
    image,
    rentPerDay,
    capacity,
    description,
    transmission,
    available,
    type,
    year,
    options,
    specs,
    driverType,
    availableAt,
    availableDate,
    availableTime,
  }) {
    this.id = id;
    this.plate = plate;
    this.manufacture = manufacture;
    this.model = model;
    this.image = image;
    this.rentPerDay = rentPerDay;
    this.capacity = capacity;
    this.description = description;
    this.transmission = transmission;
    this.available = available;
    this.type = type;
    this.year = year;
    this.options = options;
    this.specs = specs;
    this.driverType = driverType;
    this.availableAt = availableAt;
    this.availableDate = availableDate;
    this.availableTime = availableTime;
  } 

  render() {
    return `
      <div class="card mt-5" style="width: 18rem;">
        <img src="${this.image}" class="card-img-top img-fluid" alt="${this.manufacture}">
        <div class="card-body">
          <p><b>${this.type} / ${this.manufacture}</b></p>
          <h5 class="card-title"><b>Rp. ${this.rentPerDay.toLocaleString('id-ID')}/hari</b></h5>
          <p class="card-text">${this.description}</p>
          <p><i class="fas fa-car col-1"></i> ${this.driverType}</p>
          <p><i class="fas fa-clock col-1"></i> ${this.availableTime}</p>
          <p><i class="fas fa-user-friends col-1"></i> ${this.capacity}</p>
          <p><i class="fas fa-cog col-1"></i> ${this.transmission}</p>
          <p><i class="fas fa-calendar col-1"></i> Tahun ${this.year}</p>
          <a href="#" class="btn btn-success w-100 rounded-0">Pilih Mobil</a>
        </div>
      </div>
    `;
  }
}
 