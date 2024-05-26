import axios from 'axios';

export default {
//   async getRestaurant(id) {
//     const response = await axios.get(`/api/restaurants/${id}`);
//     return response.data;
//   },
  async getRestaurantSentiment(id) {
    const response = await axios.get(`${process.env.API_URL}/restaurant/${id}/sentiment`);
    return response.data;
  }
}
