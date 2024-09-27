import React, { useState } from 'react';
import { FaStar } from "react-icons/fa";
import User1 from '../../assets/user/user1.svg';
import User2 from '../../assets/user/user2.svg';
import User3 from '../../assets/user/user3.svg';
import User4 from '../../assets/user/user4.svg';
import User5 from '../../assets/user/user5.svg';
import User6 from '../../assets/user/user6.svg';

export default function Expert({ handleSubmit, formData, setFormData }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!isModalOpen);

  const Datas = [
    {
      id: 1,
      img: User1,
      name: "Ram Prasad",
      title: "Freelance Farmer",
      rating: 4,
      reviews: "2",
    },
    {
      id: 2,
      img: User2,
      name: "Shyam Das",
      title: "Urban Gardener",
      rating: 3,
      reviews: "1",
    },
    {
      id: 3,
      img: User3,
      name: "Shyam Pokhrel",
      title: "Agro Consultant",
      rating: 5,
      reviews: "3",
    },
    {
      id: 4,
      img: User4,
      name: "Binit Khadka",
      title: "Agro Consultant",
      rating: 5,
      reviews: "3",
    },
    {
      id: 5,
      img: User5,
      name: "Sobindra Budhathoki",
      title: "Agro Consultant",
      rating: 5,
      reviews: "3",
    },
    {
      id: 6,
      img: User6,
      name: "Shreejit Gautam",
      title: "Agro Consultant",
      rating: 5,
      reviews: "3",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Datas.map((data) => {
          const { id, img, name, title, rating, reviews } = data;
          return (
            <div
              key={id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <div className="bg-accent h-24 md:h-32"></div>
              <div className="w-24 h-24 md:w-32 md:h-32 mx-auto -mt-12 border-4 border-white rounded-full overflow-hidden">
                <img
                  className="object-cover w-full h-full"
                  src={img}
                  alt="Expert"
                />
              </div>
              <div className="text-center mt-4">
                <h2 className="font-semibold text-lg md:text-xl">{name}</h2>
                <p className="text-gray-500">{title}</p>
              </div>
              <ul className="py-4 text-gray-700 flex items-center justify-center space-x-1">
                {Array.from({ length: rating }, (_, index) => (
                  <FaStar key={index} className="text-yellow-500 text-xl md:text-2xl" />
                ))}
              </ul>
              <div className="text-center mb-4 text-sm">({reviews} reviews)</div>
              <button
                onClick={toggleModal}
                className="w-2/3 md:w-1/2 mx-auto block rounded-full bg-gray-900 hover:shadow-lg text-white px-4 py-2"
              >
                Send Message
              </button>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <div className="fixed z-50 inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center">
          <div className="bg-white rounded-md p-6 max-w-lg w-full mx-4 shadow-xl text-center">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="w-full">
                <h3 className="font-semibold text-lg mt-5">आफ्नो प्रश्न सोध्नुहोस् </h3>
                <div className="mt-4">
                  <div className="flex flex-col sm:flex-row sm:gap-x-4 mb-3 gap-3">
                    <input
                      className="sm:w-full border rounded-md outline-black border-black p-2 text-lg"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="आफ्नो नाम"
                      type="text"
                      name="Name"
                      id="name"
                      required
                    />
                    <input
                      className="sm:w-full border rounded-md outline-black border-black p-2 text-lg"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="आफ्नो ईमेल"
                      type="email"
                      name="email"
                      id="email"
                      required
                    />
                  </div>
                  <textarea
                    id="message"
                    rows="4"
                    className="block outline-black p-2.5 w-full text-lg rounded-lg border border-fourth"
                    placeholder="तपाईंको प्रश्न के हो?..."
                    value={formData.problem}
                    onChange={(e) =>
                      setFormData({ ...formData, problem: e.target.value })
                    }
                    required
                  ></textarea>
                </div>
              </div>
              <div className="mt-5 flex justify-center space-x-4">
                <button
                  type="submit"
                  className="text-white bg-accent hover:bg-fourth rounded-lg px-4 py-2"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="text-gray-900 bg-white border border-gray-200 hover:bg-red-600 hover:text-white rounded-lg px-4 py-2"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
