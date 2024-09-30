const DRIVER_TYPES = ["self-drive", "with-driver"];

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDriverType() {
  const index = Math.floor(Math.random() * DRIVER_TYPES.length);
  return DRIVER_TYPES[index];
}

const getRandomAvailableDate = () => {
  const today = new Date();
  const nextMonth = new Date(today);
  nextMonth.setDate(today.getDate() + 25);

  // Random date within the next month (25days)
  const randomDate = new Date(today.getTime() + Math.random() * (nextMonth - today));
  const availableDate = randomDate.toISOString().split('T')[0]; 
  return availableDate;
};

const getRandomAvailableTime = () => {
  // Random time between 06:00 and 18:00
  const randomHour = Math.floor(Math.random() * (18 - 6 + 1)) + 6; 
  const availableTime = `${randomHour.toString().padStart(2, '0')}:00`;
  return availableTime;
};

class Binar {
  static populateCars = (cars) => {
    return cars.map((car) => {
      const isPositive = getRandomInt(0, 1) === 1;
      const timeAt = new Date();
      const mutator = getRandomInt(1000000, 100000000);
      const driverType = getRandomDriverType();
      const availableAt = new Date(timeAt.getTime() + (isPositive ? mutator : -1 * mutator));
      const availableDate = getRandomAvailableDate();
      const availableTime = getRandomAvailableTime();

      return {
        ...car,
        driverType,
        availableAt,
        availableDate,
        availableTime,
      };
    })
  }

  static async listCars(filterer) {
    let cars;
    let cachedCarsString = localStorage.getItem("CARS");

    if (!!cachedCarsString) {
      const cacheCars = JSON.parse(cachedCarsString);
      cars = this.populateCars(cacheCars);
    } else {
      const response = await fetch(
        "https://raw.githubusercontent.com/fnurhidayat/probable-garbanzo/main/data/cars.min.json"
      );
      const body = await response.json();
      cars = this.populateCars(body)

      localStorage.setItem("CARS", JSON.stringify(cars));
    }

       // return cars;
       if (filterer instanceof Function) {
        console.log("Applying filter:", filterer);
        return cars.filter(filterer);
      } else {
        console.log("Filterer is not a function");
        return cars;
      }
  }
}
