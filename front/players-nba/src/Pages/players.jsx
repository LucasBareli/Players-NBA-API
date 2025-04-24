import React, { useState, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaBasketballBall, FaArrowLeft } from "react-icons/fa";

const NBAPlayers = () => {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [team, setTeam] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [newPlayerData, setNewPlayerData] = useState({
    name: "",
    position: "",
    age: "",
    height: "",
    country: "",
    image: "",
    team_id: 0,
  });

  const [searchParams] = useSearchParams();
  const teamId = searchParams.get("team_id");
  const imageArena = searchParams.get("image_arena");

  const navigate = useNavigate();

  useEffect(() => {
    if (!teamId) return;

    const fetchPlayers = async () => {
      try {
        const playersResponse = await axios.get(
          "http://127.0.0.1:8001/api/v1/playersNBA/players/",
          { params: { team_id: teamId } }
        );

        const teamResponse = await axios.get(
          `http://127.0.0.1:8001/api/v1/playersNBA/teams/${teamId}/`
        );

        setPlayers(playersResponse.data);
        setTeam(teamResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchTeams = async () => {
      try {
        const teamsResponse = await axios.get(
          "http://127.0.0.1:8001/api/v1/playersNBA/teams/"
        );

        setTeams(teamsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPlayers();
    fetchTeams();
  }, [teamId]);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://127.0.0.1:8001/api/v1/playersNBA/players/${selectedPlayer.id}/`
      );
      setPlayers(players.filter((p) => p.id !== selectedPlayer.id));
      setDeleteModalOpen(false);
    } catch (error) {
      console.error("Erro ao deletar jogador:", error);
    }
  };

  const handleCreate = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8001/api/v1/playersNBA/players/",
        newPlayerData
      );
      setPlayers([...players, response.data]);
      setCreateModalOpen(false);
    } catch (error) {
      console.error("Erro ao criar jogador:", error);
    }
  };

  const handleEdit = async () => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8001/api/v1/playersNBA/players/${selectedPlayer.id}/`,
        selectedPlayer
      );
      setPlayers(
        players.map((player) =>
          player.id === selectedPlayer.id ? response.data : player
        )
      );
      setEditModalOpen(false);
    } catch (error) {
      console.error("Erro ao editar jogador:", error);
    }
  };

  const positionsMap = {
    PG: "Point Guard",
    SG: "Shooting Guard",
    SF: "Small Forward",
    PF: "Power Forward",
    C: "Center",
  };

  const getImageUrl = (image) => {
    return image && image.startsWith("http")
      ? image
      : "https://via.placeholder.com/150x200?text=No+Image";
  };

  const getTeamNameById = () => {
    for (let i = 0; i < players.length; i++) {
      if (players[i].team_id == teams[i].id) return teams[i].name;
    }
    return "_";
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 bg-cover"
      style={{ backgroundImage: `url(${imageArena || "/default-arena.jpg"})` }}
    >
      <div className="bg-black bg-opacity-50 min-h-screen px-6 py-10 flex flex-col items-center">
        <Link
          to="/"
          className="absolute top-6 left-6 text-white text-3xl cursor-pointer hover:text-blue-500"
        >
          <FaArrowLeft />
        </Link>

        <h1 className="text-white text-4xl font-extrabold mb-10 text-center drop-shadow-xl">
          {team ? `${team.name} Players` : "Loading Players..."}
        </h1>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="mb-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer"
        >
          + Adicionar Jogador
        </button>

        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Player by Name"
          className="w-full max-w-md px-6 py-3 rounded-lg border-2 text-white bg-black border-gray-300 mb-8"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full max-w-7xl">
          {players
            .filter((player) =>
              player.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((player) => (
              <motion.div
                key={player.id}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-3xl shadow-2xl overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={getImageUrl(player.image)}
                    alt={player.name}
                    className="w-full h-60 object-cover"
                  />
                  <div className="absolute top-0 left-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm px-3 py-2 flex items-center gap-2">
                    <FaBasketballBall />
                    {player.name}
                  </div>
                </div>
                <div className="p-6">
                  <p>
                    <strong>Position:</strong>{" "}
                    {positionsMap[player.position] || player.position}
                  </p>
                  <p>
                    <strong>Age:</strong> {player.age}
                  </p>
                  <p>
                    <strong>Height:</strong> {player.height} cm
                  </p>
                  <p>
                    <strong>Country:</strong> {player.country}
                  </p>
                  <p>
                    <strong>Team:</strong> {getTeamNameById()}
                  </p>
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => {
                        setSelectedPlayer(player);
                        setEditModalOpen(true);
                      }}
                      className="text-blue-600 hover:underline cursor-pointer"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => {
                        setSelectedPlayer(player);
                        setDeleteModalOpen(true);
                      }}
                      className="text-red-600 hover:underline cursor-pointer"
                    >
                      Deletar
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>

        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-sm">
              <h2 className="text-xl font-semibold mb-4">Adicionar Jogador</h2>
              <input
                type="text"
                placeholder="Nome"
                className="w-full px-4 py-2 mb-4 border-2 border-gray-300 rounded"
                value={newPlayerData.name}
                onChange={(e) =>
                  setNewPlayerData({ ...newPlayerData, name: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Posição"
                className="w-full px-4 py-2 mb-4 border-2 border-gray-300 rounded"
                value={newPlayerData.position}
                onChange={(e) =>
                  setNewPlayerData({
                    ...newPlayerData,
                    position: e.target.value,
                  })
                }
              />
              <input
                type="number"
                placeholder="Idade"
                className="w-full px-4 py-2 mb-4 border-2 border-gray-300 rounded"
                value={newPlayerData.age}
                onChange={(e) =>
                  setNewPlayerData({ ...newPlayerData, age: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Altura (cm)"
                className="w-full px-4 py-2 mb-4 border-2 border-gray-300 rounded"
                value={newPlayerData.height}
                onChange={(e) =>
                  setNewPlayerData({ ...newPlayerData, height: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="País"
                className="w-full px-4 py-2 mb-4 border-2 border-gray-300 rounded"
                value={newPlayerData.country}
                onChange={(e) =>
                  setNewPlayerData({
                    ...newPlayerData,
                    country: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Image"
                className="w-full px-4 py-2 mb-4 border-2 border-gray-300 rounded"
                value={newPlayerData.image}
                onChange={(e) =>
                  setNewPlayerData({ ...newPlayerData, image: e.target.value })
                }
              />
              <select
                onChange={(e) =>
                  setNewPlayerData({
                    ...newPlayerData,
                    team_id: parseInt(e.target.value),
                  })
                }
                className="w-full px-4 py-2 mb-4 border-2 border-gray-300 rounded"
              >
                <option selected disabled value={""}>
                  Time
                </option>
                {teams.map((team, index) => {
                  return (
                    <option key={index} value={team.id}>
                      {team.name}
                    </option>
                  );
                })}
              </select>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCreate}
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        )}

        {isEditModalOpen && selectedPlayer && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-sm">
              <h2 className="text-xl font-semibold mb-4">Editar Jogador</h2>
              <input
                type="text"
                placeholder="Nome"
                className="w-full px-4 py-2 mb-4 border-2 border-gray-300 rounded"
                value={selectedPlayer.name}
                onChange={(e) =>
                  setSelectedPlayer({ ...selectedPlayer, name: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Posição"
                className="w-full px-4 py-2 mb-4 border-2 border-gray-300 rounded"
                value={selectedPlayer.position}
                onChange={(e) =>
                  setSelectedPlayer({
                    ...selectedPlayer,
                    position: e.target.value,
                  })
                }
              />
              <input
                type="number"
                placeholder="Idade"
                className="w-full px-4 py-2 mb-4 border-2 border-gray-300 rounded"
                value={selectedPlayer.age}
                onChange={(e) =>
                  setSelectedPlayer({ ...selectedPlayer, age: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Altura (cm)"
                className="w-full px-4 py-2 mb-4 border-2 border-gray-300 rounded"
                value={selectedPlayer.height}
                onChange={(e) =>
                  setSelectedPlayer({
                    ...selectedPlayer,
                    height: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="País"
                className="w-full px-4 py-2 mb-4 border-2 border-gray-300 rounded"
                value={selectedPlayer.country}
                onChange={(e) =>
                  setSelectedPlayer({
                    ...selectedPlayer,
                    country: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Imagem"
                className="w-full px-4 py-2 mb-4 border-2 border-gray-300 rounded"
                value={selectedPlayer.image}
                onChange={(e) =>
                  setSelectedPlayer({
                    ...selectedPlayer,
                    image: e.target.value,
                  })
                }
              />
              <select
                onChange={(e) =>
                  setSelectedPlayer({
                    ...selectedPlayer,
                    team_id: parseInt(e.target.value),
                  })
                }
                className="w-full px-4 py-2 mb-4 border-2 border-gray-300 rounded"
              >
                <option disabled value={""}>
                  Time
                </option>
                {teams.map((team, index) => (
                  <option
                    key={index}
                    value={team.id}
                    selected={selectedPlayer.team_id === team.id} 
                  >
                    {team.name}
                  </option>
                ))}
              </select>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Editar
                </button>
              </div>
            </div>
          </div>
        )}

        {isDeleteModalOpen && selectedPlayer && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-sm">
              <h2 className="text-xl font-semibold mb-4">Confirmar Deleção</h2>
              <p>
                Tem certeza que deseja deletar{" "}
                <strong>{selectedPlayer.name}</strong>?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded cursor-pointer"
                >
                  Deletar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NBAPlayers;
