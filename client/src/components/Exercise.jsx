import React from "react";
import { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import {
  Tabs,
  Button,
  TextInput,
  Label,
  Carousel,
  Select,
} from "flowbite-react";
import ExerciseCard from "./ExerciseCard";

const Exercise = () => {
  const [exercises, setExercises] = useState([]);
  const [searchType, setSearchType] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [search, setSearch] = useState("");
  const [amount, setAmount] = useState(10);
 

  useEffect(() => {
    search &&
      axiosInstance
        .get(
          import.meta.env.VITE_SERVER_BASE_URL +
            `/exerciseAPI/${searchType}/${search}/${amount}`
        )
        .then((res) => {
          setExercises(res.data);
          setSubmitted(false);
        })
        .catch((err) => console.log(err));
  }, [submitted]);

  const handleSearchInput = (e) => {
    
    setSearch(e.target.value);
  };

  const handleMuscleButton = (value) => {
    console.log(value);
    setSearch(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleSearchType = (e) => {
    setSearchType(e.target.value);
  };

  const handleSearchEquipment = (e) => {  
    setSearch(e.target.value);
  };

  const handleAmount = (e) => {
    const amount = e.target.value;
    amount > 0 ? setAmount(e.target.value) : setAmount(10);
  };
  

const SearchSelectEquipment = () => (
  <div className="m-4">
    <Label htmlFor="searchType" value="Select your search type" />
    <Select id="searchType" onChange={handleSearchEquipment}>
      <option value="">Select your search type</option>
      <option value="assisted">Assisted</option>
      <option value="band">Band</option>
      <option value="barbell">Barbell</option>
      <option value="body weight">Body Weight</option>
      <option value="bosu ball">Bosu ball</option>
    </Select>
  </div>
);

const SearchResult = () => (
  <h2>{`Search exercises for ${search}`}</h2>
);
  return (
    <>
      <div className="container">
        <div className="flex justify-center">
          <h1 className="m-10 text-xl font-bold">Search for an exercise</h1>
        </div>

        <div className="flex justify-evenly m-4">
          <div className="w-1/4">
            <Tabs aria-label="Default tabs" style="default">
              <Tabs.Item active title="Front view">
                <div className="grid grid-rows-3 grid-flow-col gap-4">
                  <Button onClick={() => handleMuscleButton("pectorals")}>
                    Pectorals
                  </Button>
                  <Button onClick={() => handleMuscleButton("delts")}>
                    Deltoids
                  </Button>
                  <Button onClick={() => handleMuscleButton("biceps")}>
                    Biceps
                  </Button>
                  <Button onClick={() => handleMuscleButton("forearms")}>
                    Forearms
                  </Button>
                  <Button onClick={() => handleMuscleButton("abs")}>
                    Abdominals
                  </Button>
                  <Button onClick={() => handleMuscleButton("quads")}>
                    Quadriceps
                  </Button>
                  <Button onClick={() => handleMuscleButton("adductors")}>
                    Adductors
                  </Button>
                </div>
              </Tabs.Item>
              <Tabs.Item active title="Back view">
                <div className="grid grid-rows-4 grid-flow-col gap-4">
                  <Button onClick={() => handleMuscleButton("lats")}>
                    Latissimus dorsi
                  </Button>
                  <Button onClick={() => handleMuscleButton("traps")}>
                    Trapezius
                  </Button>
                  <Button onClick={() => handleMuscleButton("triceps")}>
                    Triceps
                  </Button>

                  <Button onClick={() => handleMuscleButton("spine")}>
                    Lower back
                  </Button>
                  <Button onClick={() => handleMuscleButton("glutes")}>
                    Gluteus
                  </Button>
                  <Button onClick={() => handleMuscleButton("hamstrings")}>
                    Hamstrings
                  </Button>
                  <Button onClick={() => handleMuscleButton("calves")}>
                    Calves
                  </Button>
                </div>
              </Tabs.Item>
            </Tabs>
          </div>
          <div className="w-1/3">
            <div className="flex">
              <div className="m-4">
                <Label htmlFor="searchType" value="Select your search type" />
                <Select id="searchType" onChange={handleSearchType}>
                  <option value="">Select your search type</option>
                  <option value="target">Search by muscle target</option>
                  <option value="equipment">Search by equipment</option>
                  <option value="name">Search by name</option>
                </Select>
              </div>
              <div className="m-4 ">
                <Label htmlFor="amount" value="Select the amount of results" />
                <TextInput
                  className="w-1/2"
                  id="amount"
                  type="number"
                  onChange={handleAmount}
                />
              </div>
            </div>

            <div className="flex flex-col">
              {searchType === "name" && (
                <TextInput
                  className="m-4"
                  id="search"
                  type="text"
                  placeholder={`Search by ${searchType}`}
                  onChange={handleSearchInput}
                />
              )}
              {searchType === "equipment" && <SearchSelectEquipment />}
              {searchType === "target" && <SearchResult />}

              <Button className="w-1/4 self-center" onClick={handleSubmit}>
                Search
              </Button>
            </div>
          </div>
        </div>
        <div>
          {exercises.length > 0 && (
            <Carousel slide={false}>
              {exercises.map((exercise) => (
                <ExerciseCard key={exercise.id} exercise={exercise} />
              ))}
            </Carousel>
          )}
        </div>
      </div>
    </>
  );
};

export default Exercise;
