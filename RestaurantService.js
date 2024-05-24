import axios from 'axios';

export default {
//   async getRestaurant(id) {
//     const response = await axios.get(`/api/restaurants/${id}`);
//     return response.data;
//   },
  async getRestaurantSentiment(id) {
    const response = await axios.get(`http://localhost:8000/restaurant/${id}/sentiment`);
    return response.data;
  }
}
