import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const Dashboard = () => {
  return (
    <div className="bg-gray-100" style={{ overflow: "scroll" }}>
      <div>
        <Header />
      </div>
      <div className="bg-gray-100 py-20">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-800">Welcome to SimplyBook</h1>
            <p className="mt-4 text-xl text-gray-600">
              The ultimate destination for anyone looking to book an event center or venue for any kind of sport or event.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Find Your Perfect Venue</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We understand that finding the right venue can be a daunting task, whether you're a professional athlete, a recreational player, or someone who simply enjoys staying active. That's why we've created a user-friendly platform that connects you with a wide range of event centers and venues in your area, no matter what kind of sport or activity you're interested in.
              </p>
              <p className="text-gray-600 leading-relaxed">
                SimplyBook features a comprehensive database of event centers and venues, including sports complexes, community centers, schools, and more. Whether you're looking for a basketball court, a soccer field, a swimming pool, or any other kind of facility, we've got you covered.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Book Your Next Adventure</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our search and booking process is easy and intuitive. Simply enter your location and the type of sport or event you're interested in, and our platform will provide you with a list of available venues in your area. You can then compare prices, amenities, and other important details, and book the venue that best fits your needs and budget.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We also offer a range of additional services to make your experience even more enjoyable and convenient. These include online payments, scheduling tools, and customer support from our friendly and knowledgeable team.
              </p>
            </div>
          </div>
          <div className="bg-gray-100 py-20">
            <div className="container mx-auto">
              <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-gray-800">Our Mission</h1>
                <p className="mt-4 text-xl text-gray-600">
                  At SimplyBook, we believe that everyone should have access to top-quality event centers and venues for any kind of sport or activity. That's why we're committed to providing a user-friendly platform that connects you with the best venues in your area, and helps you book them quickly and easily.
</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
<div className="bg-white rounded-lg p-8 shadow-md">
<h2 className="text-2xl font-bold text-gray-800 mb-4">Our Values</h2>
<p className="text-gray-600 leading-relaxed mb-4">
At SimplyBook, we're committed to providing exceptional service and support to our customers. We believe in transparency, honesty, and integrity in all our dealings, and we strive to create a positive and inclusive community that promotes active and healthy lifestyles.
</p>
<p className="text-gray-600 leading-relaxed">
Our team is passionate about sports and fitness, and we're dedicated to making it easy for people of all ages and skill levels to find and book the perfect venue for their needs. Whether you're a professional athlete, a weekend warrior, or just starting out on your fitness journey, we're here to help you achieve your goals and enjoy a happier, healthier life.
</p>
</div>
<div className="bg-white rounded-lg p-8 shadow-md">
<h2 className="text-2xl font-bold text-gray-800 mb-4">Our Promise</h2>
<p className="text-gray-600 leading-relaxed mb-4">
At SimplyBook, we're committed to providing an exceptional booking experience for our customers. We promise to offer a user-friendly platform that's easy to use, reliable, and secure. We also promise to provide exceptional customer support to ensure that your booking process is smooth and stress-free from start to finish.
</p>
<p className="text-gray-600 leading-relaxed">
We're constantly improving our platform and adding new features and services to better serve our customers. Our goal is to become the go-to destination for anyone looking to book an event center or venue for any kind of sport or activity, and we're committed to achieving that goal through hard work, dedication, and a passion for sports and fitness.
</p>
</div>
</div>
<div className="text-center mt-16">
<a href="/signin" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg">Login</a>
</div>
</div>
</div>
</div>
</div>
</div>)}

export default Dashboard;
