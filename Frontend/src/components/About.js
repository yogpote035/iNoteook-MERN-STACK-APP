import React from "react";

const About = () => {
    return (
        <div className="container" style={{ marginTop: "5rem" }}>
            <div className="card">
                <div className="card-header bg-dark text-white">
                    <h3>About Note App</h3>
                </div>
                <div className="card-body">
                    <h5 className="card-title">Organize Your Notes Effortlessly</h5>
                    <p className="card-text">
                        The Note App is a simple and intuitive platform designed to help you
                        create, update, view, and delete your notes. Whether you need to
                        keep track of tasks, save ideas, or jot down important information,
                        this app makes it easy and accessible.
                    </p>
                    <h5>Features:</h5>
                    <ul>
                        <li>Create new notes with a title, description, and tag.</li>
                        <li>Update existing notes to keep them relevant.</li>
                        <li>Delete notes you no longer need.</li>
                        <li>View all your notes in a card-based layout.</li>
                        <li>Seamlessly integrates with a backend for secure storage.</li>
                    </ul>
                    <p>
                        This app is built with the MERN stack (MongoDB, Express, React, and
                        Node.js) to deliver a smooth and reliable user experience.
                    </p>
                    <p className="text-muted">
                        Version: 1.0.0 | Developed by Yogesh Pote
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
