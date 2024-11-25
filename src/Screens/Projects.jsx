import React from "react";

function Projects() {
  const hola = (e) => {
    e.preventDefault();
    alert('Hola');
  }

  const models = [1, 2, 3, 4, 5,6];

  const availableModels = ["Perceptrón multicapa", "Convolucionales", "GAN (Generativas)", "Transformers", "Autoencoders", "Recurrente", "Base Radial"];

  return (
    <div className="mt-16 p-5 grid grid-cols-12 gap-10">
      <div className="col-span-8">
        <h1 className="text-3xl font-bold mb-5">Tus Modelos</h1>
        <div className="grid grid-cols-5 gap-5">
          {
            models.map(m => <div className="rounded-md grid">
              <div className="w-full flex justify-center">
                <div className="w-full h-44 bg-gray-300 flex justify-center">
                  <img className="w-1/2 object-contain" src="https://cdn-icons-png.flaticon.com/512/6461/6461819.png" alt="" srcset="" />
                </div>
              </div>
              <p className="text-lg">Nombre modelo</p>
              <p className="text-lg">16 feb 2024 12:56</p>
            </div>)
          }
        </div>

        <h1 className="text-3xl font-bold my-5">Crea algo nuevo</h1>
        <div className="grid grid-cols-5 gap-5">
          {
            availableModels.map(m => <div className="rounded-md grid">
              <div className="w-full flex justify-center">
                <div className="w-full h-44 bg-gray-300 flex justify-center">
                  <img className="w-1/2 object-contain" src="https://cdn-icons-png.flaticon.com/512/6461/6461819.png" alt="" srcset="" />
                </div>
              </div>
              <p className="text-lg">{m}</p>
            </div>)
          }
        </div>
      </div>

      <div className="col-span-4 bg-gray-400 p-5">
        <h1 className="text-2xl font-bold">Información</h1>
      </div>
    </div>
  );
}

export default Projects;
