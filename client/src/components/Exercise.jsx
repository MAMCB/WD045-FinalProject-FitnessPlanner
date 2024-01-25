import React from 'react'
import {useState, useEffect} from 'react'
import axiosInstance from '../axiosInstance'
import {Tabs,Button,TextInput,Label,Checkbox} from "flowbite-react"

const Exercise = () => {
    const [exercises, setExercises] = useState([]);
    const [searchType, setSearchType] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => {
        search &&
        axiosInstance
          .get(import.meta.env.VITE_SERVER_BASE_URL + `/exerciseAPI/${searchType}/${search}/10`)
          .then((res) => {
            setExercises(res.data);
          })
          .catch((err) => console.log(err));
    }, [submitted])

    const handleSearchInput = (e) => {
        setSearch(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    }

    const handleSearchType = (e) => {
        setSearchType(e.target.value);
    }
  return (
    <>
      <div className="container">
        <h1>Search for an exercise</h1>
        <div className="flex">
          <div>
            <Tabs aria-label="Default tabs" style="default">
              <Tabs.Item active title="Front view">
                <div className="grid grid-rows-3 grid-flow-col gap-4">
                  <Button>Pectorals</Button>
                  <Button>Deltoids</Button>
                  <Button>Biceps</Button>
                  <Button>Forearms</Button>
                  <Button>Abdominals</Button>
                  <Button>Quadriceps</Button>
                </div>
              </Tabs.Item>
              <Tabs.Item active title="Back view">
                <div className="grid grid-rows-4 grid-flow-col gap-4">
                  <Button>Latissimus dorsi</Button>
                  <Button>Trapezius</Button>
                  <Button>Triceps</Button>
                  <Button>Obliques</Button>
                  <Button>Lower back</Button>
                  <Button>Gluteus </Button>
                  <Button>Hamstrings</Button>
                  <Button>Calves</Button>
                </div>
              </Tabs.Item>
            </Tabs>
          </div>
          <div>
            <Label htmlFor="checkbox-1" value="Search by muscle" />
            <Checkbox
              id="checkbox-1"
              value="target"
              onClick={handleSearchType}
            />
            <Label htmlFor="checkbox-2" value="Search by equipment" />
            <Checkbox
              id="checkbox-2"
              value="equipment"
              onClick={handleSearchType}
            />
            <Label htmlFor="checkbox-3" value="Search by name" />
            <Checkbox id="checkbox-3" value="name" onClick={handleSearchType} />
            <div className="mb-2 block">
              <Label htmlFor="search" value="Search for an exercise" />

              <TextInput
                id="search"
                type="text"
                required
                onChange={handleSearchInput}
              />
              <Button onClick={handleSubmit}>Search</Button>
            </div>
            <div>
              {exercises.length > 0 &&
                exercises.map((exercise) => (
                  <div key={exercise.id}>
                    <h3>{exercise.name}</h3>
                    <h4>{exercise.target}</h4>
                    <h4>{exercise.equipment}</h4>
                    <h4>{exercise.bodyPart}</h4>
                    <img src={exercise.gifUrl} alt={exercise.name} />
                    {exercise.instructions.map((instruction, index) => (
                      <p key={index}>{instruction}</p>
                    ))}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Exercise