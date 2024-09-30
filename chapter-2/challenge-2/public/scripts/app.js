class App {
  constructor() {
    this.driverTypeInput = document.getElementById("tipe-driver");
    this.availableDateInput = document.getElementById("tanggal-sewa");
    this.availableTimeInput = document.getElementById("waktu-jemput");
    this.capacityInput = document.getElementById("kapasitas");
    this.filterButton = document.getElementById("cari-mobil");
    this.filterForm = document.getElementById("filter-form");
    this.carContainerElement = document.getElementById("cars-container");

    this.filterArgument = {
      driverType: null,
      availableDate: null,
      availableTime: null,
      capacity: null,
    };
  }

  async init() {
    await this.load();
    const cars = Car.list;

    // Register click listener
    // this.driverTypeInput.addEventListener("change", (e) => {
    //   const tipeDriver = e.target.value;
    //   console.log("Selected Tipe Driver: ", tipeDriver);

    //   this.filterArgument.driverType = tipeDriver;
    //   this.applyFilters(cars);
    // });

    // this.availableDateInput.addEventListener("change", (e) => {
    //   const tanggalSewa = e.target.value;
    //   console.log("Selected Tanggal: ", tanggalSewa);

    //   this.filterArgument.availableDate = tanggalSewa;
    //   this.applyFilters(cars);
    // });

    // this.availableTimeInput.addEventListener("change", (e) => {
    //   const waktuJemput = e.target.value;
    //   console.log("Selected Waktu Jemput: ", waktuJemput);

    //   this.filterArgument.availableTime = waktuJemput;
    //   this.applyFilters(cars);
    // });

    // this.capacityInput.addEventListener("change", (e) => {
    //   const kapasitas = e.target.value;
    //   console.log("Selected Penumpang: ", kapasitas);

    //   const parsedCapacity = parseInt(kapasitas);
    //   this.filterArgument.capacity = parsedCapacity;
    //   this.applyFilters(cars);
    // });

    this.filterButton.addEventListener('click', (e) => {
      const tipeDriver = this.driverTypeInput.value || '';
      console.log("Selected Driver: ", tipeDriver);
      
      const tanggalSewa = this.availableDateInput.value || '';
      console.log("Selected Tanggal: ", tanggalSewa);

      const selectedTime = this.availableTimeInput.value || '';
      // split value array dari waktu jemput
      const waktuJemput = selectedTime.split(','); 
      console.log("Selected Waktu: ", waktuJemput);

      // individual time(array) after splitted
      const timeOne = waktuJemput[0];
      const timeTwo = waktuJemput[1];
      const timeThree = waktuJemput[2];

      const kapasitas = this.capacityInput.value || '';
      const parsedCapacity = parseInt(kapasitas);
      console.log("Selected Penumpang: ", kapasitas);

      this.filterArgument.timeOne = timeOne;
      this.filterArgument.timeTwo = timeTwo;
      this.filterArgument.timeThree = timeThree;
      this.filterArgument.driverType = tipeDriver;
      this.filterArgument.availableDate = tanggalSewa;
      this.filterArgument.capacity = parsedCapacity;
      this.applyFilters(cars);
    });
    
    this.filterForm.addEventListener("submit", (e) => {
        e.preventDefault();
    });
  }

  applyFilters(cars) {
    const filteredCars = this.filteredCars(cars, this.filterArgument);
    console.log("Filtered Cars: ", filteredCars);
    this.renderCars(filteredCars);
  }

  // untuk fungsi atau method dalam class, pastikan argument dipakai semua
  // kalau tidak dipakai atau hanya untuk console saja, maka hapus argumennya
  // kalau ada argumen tidak terpakai, argumen lainnya akan tidak terpanggil
  filterLogic(targetCar, filterArgument) {
    // handle filter driverType
    const isDriverMatch = targetCar.driverType === filterArgument.driverType;

    // handle filter availableDate with range a few day less or more based on the input
    const parsedInputDate = new Date(filterArgument.availableDate);
    const startDate = new Date(parsedInputDate);
    const endDate = new Date(parsedInputDate);
    startDate.setDate(startDate.getDate() - 2); //  2 day before
    endDate.setDate(endDate.getDate() + 5); // 5 day after

    const carDate = new Date(targetCar.availableDate);
    const isDateMatch = carDate >= startDate && carDate <= endDate;

    // handle filter availableTime
    const car = targetCar.availableTime;
    const isTimeMatch = car === filterArgument.timeOne || car === filterArgument.timeTwo || car === filterArgument.timeThree;

    // handle filter capacity
    // const isCapacityMatch = targetCar.capacity >= filterArgument.capacity;

    return [isDriverMatch, isDateMatch, isTimeMatch];
  }

  filteredCars(cars, filterArgument) {
    if (!Array.isArray(cars)) {
      return [];
    }

    const logic = cars.filter(car => {
      const [isDriverMatch, isDateMatch, isTimeMatch] = this.filterLogic(car, filterArgument); 
      console.log("driver: ", isDriverMatch, "date: ", isDateMatch, "time:", isTimeMatch);
      return isDriverMatch && isDateMatch && isTimeMatch;
    });

    console.log(logic);
    return logic;
  }

  renderCars(filteredCars) {
    this.carContainerElement.innerHTML = ""; // Clear existing content
    if (filteredCars.length === 0) {
      this.carContainerElement.innerHTML = `<p>Tidak ditemukan mobil yang sesuai.</p>`;
      return;
    }

    const rowContent = document.createElement("div");
    rowContent.classList.add("row");
    
    filteredCars.forEach(car => {
      const node = document.createElement("div");
      node.classList.add("col-md-4", "mb-4")
  
      node.innerHTML = car.render(); 
      rowContent.appendChild(node); // Append the column to the row
    });
  
    this.carContainerElement.appendChild(rowContent);
  }

  async load() {
    const cars = await Binar.listCars(this.filteredCars);
    Car.init(cars); // Initialize Car class
  }
}

