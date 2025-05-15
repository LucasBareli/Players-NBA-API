import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaBasketballBall, FaTrashAlt, FaEdit, FaPlusCircle } from "react-icons/fa";
import Image from "../images/teste.jfif"

const NBASelection = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    arena: "",
    image_arena: "",
  });

  const navigate = useNavigate();

  const fetchTeams = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8001/api/v1/playersNBA/teams/"
      );
      setTeams(response.data);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleTeamSelect = (team) => setSelectedTeam(team);

  const handleNavigateToPlayers = () => {
    if (selectedTeam) {
      navigate(`/players?team_id=${selectedTeam.id}`);
    }
  };

  const handleOpenModal = (team = null) => {
    if (team) {
      setIsEditing(true);
      setFormData(team);
    } else {
      setIsEditing(false);
      setFormData({ name: "", city: "", arena: "", image_arena: "" });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ name: "", city: "", arena: "", image_arena: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (isEditing) {
        await axios.put(
          `http://127.0.0.1:8001/api/v1/playersNBA/teams/${formData.id}`,
          formData
        );
      } else {
        await axios.post(
          "http://127.0.0.1:8001/api/v1/playersNBA/teams/",
          formData
        );
      }
      fetchTeams();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving team:", error);
    }
  };

  const handleDeleteTeam = async (id) => {
    if (!window.confirm("Are you sure you want to delete this team?")) return;

    try {
      await axios.delete(`http://127.0.0.1:8001/api/v1/playersNBA/teams/${id}`);
      fetchTeams();
      if (selectedTeam?.id === id) setSelectedTeam(null);
    } catch (error) {
      console.error("Error deleting team:", error);
    }
  };

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: selectedTeam
          ? `url(${selectedTeam.image_arena})`
          : Image,
      }}
    >
      <div className="bg-black bg-opacity-60 w-full min-h-screen flex flex-col items-center justify-start py-10 px-6">
        <h1 className="text-white text-4xl font-bold mb-8 text-center drop-shadow-lg">
          Manage and Select NBA Arenas
        </h1>

        <div className="mb-6">
          <Button
            className="cursor-pointer bg-blue-600 border-0 px-4 py-2 rounded-full font-semibold shadow-md hover:bg-blue-700 transition-all flex items-center gap-2"
            onClick={() => handleOpenModal()}
          >
            <FaPlusCircle />
            Add New Arena
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {teams.map((team) => (
            <motion.div
              key={team.id}
              whileHover={{ scale: 1.03 }}
              className="relative"
            >
              <Card
                className={`p-4 rounded-xl shadow-lg cursor-pointer transition-all ${
                  selectedTeam?.id === team.id
                    ? "bg-blue-700 text-white"
                    : "bg-white text-black"
                }`}
                onClick={() => handleTeamSelect(team)}
              >
                <Card.Body className="text-center">
                  <Card.Title className="text-xl font-bold flex items-center justify-center gap-2">
                    <FaBasketballBall />
                    {team.name}
                  </Card.Title>
                  <p className="text-sm">{team.city}</p>
                  <p className="text-sm">{team.arena}</p>
                </Card.Body>
              </Card>
              <div className="absolute top-3 right-3 flex gap-2">
                <Button
                  size="sm"
                  variant="light"
                  className="text-warning border-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenModal(team);
                  }}
                >
                  <FaEdit />
                </Button>
                <Button
                  size="sm"
                  variant="light"
                  className="text-danger border-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteTeam(team.id);
                  }}
                >
                  <FaTrashAlt />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {selectedTeam && (
          <Button
            className="cursor-pointer mt-8 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full shadow-lg font-bold"
            onClick={handleNavigateToPlayers}
          >
            Confirm
          </Button>
        )}

        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header
            closeButton
            className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg rounded-t-xl"
          >
            <Modal.Title className="font-semibold text-xl">
              {isEditing ? "Edit Arena" : "Add New Arena"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-white p-6 rounded-b-xl">
            <Form>
              <Form.Group className="mb-4">
                <Form.Label className="text-gray-700 font-medium">
                  Name
                </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter the team name"
                  className="p-3 rounded-lg border-2 border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label className="text-gray-700 font-medium">
                  City
                </Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Enter the city"
                  className="p-3 rounded-lg border-2 border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label className="text-gray-700 font-medium">
                  Arena
                </Form.Label>
                <Form.Control
                  type="text"
                  name="arena"
                  value={formData.arena}
                  onChange={handleInputChange}
                  placeholder="Enter the arena name"
                  className="p-3 rounded-lg border-2 border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label className="text-gray-700 font-medium">
                  Image URL
                </Form.Label>
                <Form.Control
                  type="text"
                  name="image_arena"
                  value={formData.image_arena}
                  onChange={handleInputChange}
                  placeholder="Enter the image URL"
                  className="p-3 rounded-lg border-2 border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="bg-gray-100 rounded-b-xl">
            <Button
              variant="outline-secondary"
              onClick={handleCloseModal}
              className="px-6 py-2 rounded-full text-gray-600 font-semibold hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 transition-all"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
              className="px-6 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-all"
            >
              {isEditing ? "Save Changes" : "Add Arena"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default NBASelection;
