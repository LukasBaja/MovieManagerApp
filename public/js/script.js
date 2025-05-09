const fetchUrl = "http://localhost:3000/";
const getContainer = document.getElementById("container");
const getButtonContainer = document.getElementById("buttonContainer");

const showMoviesButton = document.createElement("button");
showMoviesButton.textContent = "Show Movies";

const addDirectorButton = document.createElement("button");
addDirectorButton.textContent = "Manage Director";

const addMovieButton = document.createElement("button");
addMovieButton.textContent = "Add Movie";

getButtonContainer.append(showMoviesButton, addDirectorButton, addMovieButton);

// Message for success and error

function showPopup(message, isSuccess = true) {
  const popup = document.createElement("div");
  popup.className = `${isSuccess ? "success" : "error"}-message`;
  popup.textContent = message;

  document.body.appendChild(popup);

  setTimeout(() => {
    popup.remove();
  }, 3000);
}

function setTitle(title) {
  const existingTitle = document.getElementById("title");
  if (existingTitle) {
    existingTitle.remove();
  }
  const titleName = document.createElement("h2");
  titleName.id = "title";
  titleName.textContent = title;

  getContainer.appendChild(titleName);
}

// Press button to create Director form
addDirectorButton.addEventListener("click", () => {
  showDirectorForm();
});
function showDirectorForm() {
  getContainer.innerHTML = "";
  setTitle("Add Director");
  const form = document.createElement("form");
  form.id = "directorForm";

  const inputFirstName = document.createElement("input");
  inputFirstName.type = "text";
  inputFirstName.name = "firstName";
  inputFirstName.placeholder = "Enter First Name";

  const inputLastName = document.createElement("input");
  inputLastName.type = "text";
  inputLastName.name = "lastName";
  inputLastName.placeholder = "Enter Last Name";

  const inputBirthDate = document.createElement("input");
  inputBirthDate.type = "date";
  inputBirthDate.name = "birthDate";

  const inputButton = document.createElement("button");
  inputButton.type = "submit";
  inputButton.textContent = "Add Director"; /// ADD director to sql

  getContainer.appendChild(form);
  form.append(inputFirstName, inputLastName, inputBirthDate, inputButton);

  if (inputButton) {
    inputButton.addEventListener("click", (event) => {
      event.preventDefault();

      const formData = new FormData(form);

      const directorData = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        birthDate: formData.get("birthDate"),
      };
      fetch(fetchUrl + "add-director", {
        method: "POST",
        body: JSON.stringify(directorData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          showPopup("Director added successfully", true);
          showDirectorForm();
        })
        .catch((error) => {
          console.log(error);
          showPopup("Error adding director", false);
        });
      form.reset();
    });
  }

  // Director div
  const directorList = document.createElement("div");
  directorList.id = "directorList";

  getContainer.appendChild(directorList);

  // Show director table
  const directorTableTitle = document.createElement("h2");
  directorTableTitle.textContent = "Director List";
  directorTableTitle.id = "directorTableTitle";
  directorList.appendChild(directorTableTitle);

  const table = document.createElement("table");
  const tr = document.createElement("tr");
  table.id = "directorListTable";
  const existingTable = document.querySelector("#directorListTable");
  if (existingTable) {
    existingTable.remove();
  }
  getContainer.appendChild(table);
  table.appendChild(tr);

  const heading = ["First Name", "Last Name", "Birth Date"];

  heading.forEach((element) => {
    const th = document.createElement("th");
    th.textContent = element;
    tr.appendChild(th);
  });
  fetch(fetchUrl + "get-director", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        const row = document.createElement("tr");

        // Update director form and fetch data
        row.addEventListener("click", () => {
          console.log("Row clicked:", element._id);

          getContainer.innerHTML = "";
          setTitle("Update Director");

          const form = document.createElement("form");
          form.id = "updateDirectorForm";

          const inputFirstName = document.createElement("input");
          inputFirstName.type = "text";
          inputFirstName.name = "firstName";
          inputFirstName.value = element.firstName;

          const inputLastName = document.createElement("input");
          inputLastName.type = "text";
          inputLastName.name = "lastName";
          inputLastName.value = element.lastName;

          const inputBirthDate = document.createElement("input");
          inputBirthDate.type = "date";
          inputBirthDate.name = "birthDate";
          inputBirthDate.value = element.birthDate.split("T")[0];

          const updateButton = document.createElement("button");
          updateButton.type = "submit";
          updateButton.textContent = "Update Director";

          // Delete director button
          const deleteButton = document.createElement("button");
          deleteButton.id = "deletebtn";
          deleteButton.addEventListener("click", (event) => {
            event.preventDefault();
            const checkifAlertExists = document.getElementById("confirmDelete");
            if (!checkifAlertExists) {
              const confirmDelete = document.createElement("div");
              confirmDelete.id = "confirmDelete";

              const confirmText = document.createElement("h3");
              confirmText.textContent =
                "Are you sure you want to delete this director?";
              const buttonYes = document.createElement("button");
              buttonYes.id = "yesbtn";
              buttonYes.textContent = "Yes";
              const buttonNo = document.createElement("button");
              buttonNo.id = "nobtn";
              buttonNo.textContent = "No";
              document.body.appendChild(confirmDelete);

              confirmDelete.append(confirmText, buttonYes, buttonNo);

              buttonNo.addEventListener("click", () => {
                confirmDelete.remove();
              });
              buttonYes.addEventListener("click", () => {
                fetch(fetchUrl + `delete-director/${element._id}`, {
                  method: "DELETE",
                })
                  .then((response) => {
                    if (!response.ok) {
                      throw new Error("Something went wrong");
                    }
                    return response.json();
                  })
                  .then(() => {
                    showPopup("Director deleted successfully", true);
                    showDirectorForm();
                  })
                  .catch(() => {
                    showPopup("Error deleting director", false);
                  });
                confirmDelete.remove();
              });
            }
          });
          deleteButton.textContent = "Delete";

          form.append(
            inputFirstName,
            inputLastName,
            inputBirthDate,
            updateButton,
            deleteButton
          );
          getContainer.appendChild(form);

          updateButton.addEventListener("click", (event) => {
            event.preventDefault();

            const formData = new FormData(form);

            const updatedDirectorData = {
              firstName: formData.get("firstName"),
              lastName: formData.get("lastName"),
              birthDate: formData.get("birthDate"),
            };

            // Check if data has changed
            const isDataChanged =
              updatedDirectorData.firstName !== element.firstName ||
              updatedDirectorData.lastName !== element.lastName ||
              updatedDirectorData.birthDate !== element.birthDate.split("T")[0];
            if (!isDataChanged) {
              showPopup(
                "No changes were made. Please update the fields.",
                false
              );
              return;
            }

            fetch(fetchUrl + `update-director/${element._id}`, {
              method: "PUT",
              body: JSON.stringify(updatedDirectorData),
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Network response was not ok");
                }
                return response.json();
              })
              .then(() => {
                showPopup("Director updated successfully", true);
                showDirectorForm();
              })
              .catch(() => {
                showPopup("Error updating director", false);
              });
          });
        });

        const cellFirstName = document.createElement("td");
        cellFirstName.textContent = element.firstName;
        const cellLastName = document.createElement("td");
        cellLastName.textContent = element.lastName;
        const cellBirthDate = document.createElement("td");
        cellBirthDate.textContent = element.birthDate.split("T")[0];
        table.appendChild(row);
        row.append(cellFirstName, cellLastName, cellBirthDate);
      });
    })
    .catch((error) => {
      console.log("Error fetching Directors:", error);
    });
  directorList.appendChild(table);
}

// Add movie button event

addMovieButton.addEventListener("click", () => {
  getContainer.innerHTML = "";
  setTitle("Add Movie");

  const form = document.createElement("form");
  form.id = "movieForm";

  const inputTitle = document.createElement("input");
  inputTitle.type = "text";
  inputTitle.name = "title";
  inputTitle.placeholder = "Enter Movie Title";

  const inputDescription = document.createElement("textarea");
  inputDescription.name = "description";
  inputDescription.placeholder = "Enter Movie Description";

  const inputYear = document.createElement("input");
  inputYear.type = "number";
  inputYear.name = "year";
  inputYear.placeholder = "Enter Movie Year";

  const directorSelect = document.createElement("select");
  directorSelect.name = "director";

  const defaultOption = document.createElement("option");
  defaultOption.disabled = true;
  defaultOption.selected = true;
  defaultOption.textContent = "Select Director";
  directorSelect.appendChild(defaultOption);

  fetch(fetchUrl + "get-director", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        const option = document.createElement("option");
        option.value = element._id;
        option.textContent = `${element.firstName} ${element.lastName}`;
        directorSelect.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error fetching Directors:", error);
    });

  getContainer.appendChild(form);
  form.append(inputTitle, inputYear, directorSelect, inputDescription);

  const genreList = [
    "Action",
    "Comedy",
    "Drama",
    "Fantasy",
    "Horror",
    "Mystery",
    "Romance",
    "Thriller",
    "Western",
    "Sci-Fi",
    "Adventure",
    "Animation",
    "Documentary",
    "Biography",
    "Crime",
    "Family",
    "History",
    "Musical",
    "Sport",
    "War",
  ];

  const checkboxContainer = document.createElement("div");
  checkboxContainer.id = "checkboxContainer";
  form.appendChild(checkboxContainer);

  genreList.forEach((element) => {
    const inputGenre = document.createElement("input");

    inputGenre.type = "checkbox";
    inputGenre.id = element;
    inputGenre.value = element;
    inputGenre.name = element;

    const labelGenre = document.createElement("label");
    labelGenre.htmlFor = element;
    labelGenre.textContent = element;
    checkboxContainer.append(inputGenre, labelGenre);
  });
  const insertButton = document.createElement("button");
  insertButton.type = "submit";
  insertButton.textContent = "Add Movie";
  insertButton.id = "insertMovie";
  form.appendChild(insertButton);

  // Insert To SQL
  if (insertButton) {
    insertButton.addEventListener("click", (event) => {
      event.preventDefault();

      const formData = new FormData(form);

      const movieData = {
        title: formData.get("title"),
        description: formData.get("description"),
        year: formData.get("year"),
        movieDirector: formData.get("director"),
        genre: Array.from(
          form.querySelectorAll("input[type=checkbox]:checked")
        ).map((checkbox) => checkbox.value),
      };
      fetch(fetchUrl + "add-movie", {
        method: "POST",
        body: JSON.stringify(movieData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          showPopup("Movie added successfully", true);
        })
        .catch((error) => {
          showPopup("Error adding movie", false);
        });
      form.reset();
    });
  }
});

/// Show movie table
function showTable() {
  getContainer.innerHTML = "";

  setTitle("Movie List");

  const table = document.createElement("table");
  const tr = document.createElement("tr");

  const td = document.createElement("td");

  table.id = "movieList";
  const checkTable = document.querySelector("#movieList");
  if (!checkTable) {
    getContainer.appendChild(table);
    table.appendChild(tr);

    const heading = [
      "Title",
      "Description",
      "Release Year",
      "Genre",
      "Director",
    ];

    heading.forEach((element) => {
      const th = document.createElement("th");
      th.textContent = element;
      tr.appendChild(th);
    });
  }

  fetch(fetchUrl + "get-movies", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        const row = document.createElement("tr");

        // Update movie form and fetch data
        row.addEventListener("click", () => {
          console.log("Row clicked:", element._id);

          getContainer.innerHTML = "";
          setTitle("Update Movie");

          const form = document.createElement("form");
          form.id = "updateMovieForm";

          const inputTitle = document.createElement("input");
          inputTitle.type = "text";
          inputTitle.name = "title";
          inputTitle.value = element.title;

          const inputDescription = document.createElement("textarea");
          inputDescription.name = "description";
          inputDescription.value = element.description;

          const inputYear = document.createElement("input");
          inputYear.type = "number";
          inputYear.name = "year";
          inputYear.value = element.year;

          const directorSelect = document.createElement("select");
          directorSelect.name = "director";

          const defaultOption = document.createElement("option");
          defaultOption.disabled = true;
          defaultOption.textContent = "Select Director";
          directorSelect.appendChild(defaultOption);

          fetch(fetchUrl + "get-director", {
            method: "GET",
          })
            .then((response) => response.json())
            .then((data) => {
              data.forEach((director) => {
                const option = document.createElement("option");
                option.value = director._id;
                option.textContent = `${director.firstName} ${director.lastName}`;
                if (director._id === element.movieDirector._id) {
                  option.selected = true;
                }
                directorSelect.appendChild(option);
              });
            })
            .catch((error) => {
              console.error("Error fetching Directors:", error);
            });

          const checkboxContainer = document.createElement("div");
          checkboxContainer.id = "checkboxContainer";

          const genreList = [
            "Action",
            "Comedy",
            "Drama",
            "Fantasy",
            "Horror",
            "Mystery",
            "Romance",
            "Thriller",
            "Western",
            "Sci-Fi",
            "Adventure",
            "Animation",
            "Documentary",
            "Biography",
            "Crime",
            "Family",
            "History",
            "Musical",
            "Sport",
            "War",
          ];

          genreList.forEach((genre) => {
            const inputGenre = document.createElement("input");
            inputGenre.type = "checkbox";
            inputGenre.id = genre;
            inputGenre.value = genre;
            inputGenre.name = "genre";
            if (element.genre.includes(genre)) {
              inputGenre.checked = true;
            }

            const labelGenre = document.createElement("label");
            labelGenre.htmlFor = genre;
            labelGenre.textContent = genre;
            checkboxContainer.append(inputGenre, labelGenre);
          });

          const updateButton = document.createElement("button");
          updateButton.type = "submit";
          updateButton.textContent = "Update Movie";

          // Delete movie button

          const deleteButton = document.createElement("button");
          deleteButton.id = "deletebtn";
          deleteButton.addEventListener("click", (event) => {
            event.preventDefault();
            const checkifAlertExists = document.getElementById("confirmDelete");
            if (!checkifAlertExists) {
              const confirmDelete = document.createElement("div");
              confirmDelete.id = "confirmDelete";

              const confirmText = document.createElement("h3");
              confirmText.textContent =
                "Are you sure you want to delete this movie?";
              const buttonYes = document.createElement("button");
              buttonYes.id = "yesbtn";
              buttonYes.textContent = "Yes";
              const buttonNo = document.createElement("button");
              buttonNo.id = "nobtn";
              buttonNo.textContent = "No";
              document.body.appendChild(confirmDelete);

              confirmDelete.append(confirmText, buttonYes, buttonNo);

              buttonNo.addEventListener("click", () => {
                confirmDelete.remove();
              });
              buttonYes.addEventListener("click", () => {
                fetch(fetchUrl + `delete-movie/${element._id}`, {
                  method: "DELETE",
                })
                  .then((response) => {
                    if (!response.ok) {
                      throw new Error("Something went wrong");
                    }
                    return response.json();
                  })
                  .then((data) => {
                    showPopup("Movie deleted successfully", true);
                    showTable();
                  })
                  .catch((error) => {
                    showPopup("Error deleting movie", false);
                  });
                confirmDelete.remove();
                showTable();
              });
            }
          });
          deleteButton.textContent = "Delete";

          form.append(
            inputTitle,
            inputYear,
            directorSelect,
            inputDescription,
            checkboxContainer,
            updateButton,
            deleteButton
          );
          getContainer.appendChild(form);

          updateButton.addEventListener("click", (event) => {
            event.preventDefault();

            const formData = new FormData(form);

            const updatedMovieData = {
              title: formData.get("title"),
              description: formData.get("description"),
              year: formData.get("year"),
              movieDirector: formData.get("director"),
              genre: Array.from(
                form.querySelectorAll("input[type=checkbox]:checked")
              ).map((checkbox) => checkbox.value),
            };

            // Check if data has changed
            const isDataChanged =
              updatedMovieData.title !== element.title ||
              updatedMovieData.description !== element.description ||
              updatedMovieData.year !== element.year.toString() ||
              updatedMovieData.movieDirector !== element.movieDirector._id ||
              JSON.stringify(updatedMovieData.genre.sort()) !==
                JSON.stringify((element.genre || []).sort());
            if (!isDataChanged) {
              showPopup(
                "No changes were made. Please update the fields.",
                false
              );
              return;
            }
            //
            fetch(fetchUrl + `update-movie/${element._id}`, {
              method: "PUT",
              body: JSON.stringify(updatedMovieData),
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Network response was not ok");
                }
                return response.json();
              })
              .then((data) => {
                showPopup("Movie updated successfully", true);
                showTable();
              })
              .catch((error) => {
                showPopup("Error updating movie", false);
              });
          });
        });

        const cellTitle = document.createElement("td");

        cellTitle.textContent = element.title;

        const cellDescription = document.createElement("td");
        cellDescription.textContent = element.description;

        const cellYear = document.createElement("td");
        cellYear.textContent = element.year;

        const cellGenre = document.createElement("td");

        element.genre.forEach((element) => {
          const cellGenreSpan = document.createElement("span");
          cellGenreSpan.textContent = element;
          cellGenreSpan.style.margin = "5px";
          cellGenre.appendChild(cellGenreSpan);
        });

        const cellDirector = document.createElement("td");
        cellDirector.textContent = `${element.movieDirector.firstName} ${element.movieDirector.lastName}`;

        table.appendChild(row);
        row.append(
          cellTitle,
          cellDescription,
          cellYear,
          cellGenre,
          cellDirector
        );
      });
    })
    .catch((error) => {
      console.log("Error fetching Movies:", error);
    });
}
showMoviesButton.addEventListener("click", () => {
  getContainer.innerHTML = "";
  showTable();
});

showTable();
