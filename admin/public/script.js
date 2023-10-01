const sectionSelect = document.getElementById("sectionSelect");
const sectionButton = document.getElementById("sectionButton");
const sectionContent = document.getElementById("sectionContent");

sectionButton.addEventListener("click", () => {
    const selectedSection = sectionSelect.value;
    sectionContent.innerHTML = "";
    if (selectedSection === "showcase") {
        const paragraph = document.createElement("p");
        paragraph.textContent =
            'Showcase photos should be of "facebook" quality and contain your watermark. You can name them whatever you want, they are sorted alphabetically on the website. They should also be in the ".jpg" format. Make sure to replace swedish letters like å, ä, ö, with aa, ae, oe.';
        const label = document.createElement("label");
        label.textContent = "Select a Page:";
        label.setAttribute("for", "bucketSelect");
        const bucketSelect = document.createElement("select");
        bucketSelect.id = "bucketSelect";
        const options = [
            { value: "carousel", text: "Home (Photo carousel)" },
            { value: "nature", text: "Nature" },
            { value: "animals", text: "Animals" },
            { value: "architectural", text: "Architectural" },
            { value: "portrait", text: "Portrait" },
            { value: "wedding", text: "Wedding" },
            { value: "sport", text: "Sport" },
        ];
        options.forEach((option) => {
            const optionElement = document.createElement("option");
            optionElement.value = option.value;
            optionElement.textContent = option.text;
            bucketSelect.appendChild(optionElement);
        });

        const bucketButton = document.createElement("button");
        bucketButton.textContent = "Load";
        const bucketContent = document.createElement("div");

        sectionContent.appendChild(paragraph);
        sectionContent.appendChild(label);
        sectionContent.appendChild(bucketSelect);
        sectionContent.appendChild(bucketButton);
        sectionContent.appendChild(bucketContent);
        let selectedBucket = bucketSelect.value;

        bucketButton.addEventListener("click", () => {
            selectedBucket = bucketSelect.value;
            if (selectedBucket) {
                loadItemsFromBucket(selectedBucket, bucketContent);
            }
        });
    } else if (selectedSection === "shop") {
        const paragraph = document.createElement("p");
        paragraph.textContent =
            'Shop photos should be of the highest quality. When you name them make sure to include the price at then end of the name after a space with the letter "e" behind (e.g., "blommor 200e.jpg" or "glass 95e.jpg"). They should also be in the ".jpg" format. The shop photos are also sorted alphabetically on the website. Make sure to replace swedish letters like å, ä, ö, with aa, ae, oe.';
        const shopContent = document.createElement("div");
        sectionContent.appendChild(paragraph);
        sectionContent.appendChild(shopContent);
        loadItemsFromBucket("shop", shopContent);
    }
});

function loadItemsFromBucket(bucket, bucketContent) {
    fetch(`/get-photos?bucket=${bucket}`)
        .then((response) => response.json())
        .then((data) => {
            // Clear the existing content in the bucketContent element
            bucketContent.innerHTML = "";
            const title = document.createElement("h3");
            title.textContent = "Photos in " + bucket;
            sectionContent.appendChild(title);
            const list = document.createElement("ol");
            bucketContent.appendChild(title);
            uploadPhoto(bucketContent);
            bucketContent.appendChild(list);

            // Iterate through the items in the data array
            data.forEach((item) => {
                const listItem = document.createElement("li");
                const anchor = document.createElement("a");
                anchor.href = "javascript:void(0);";
                anchor.textContent = item.name;
                anchor.addEventListener("click", () => {
                    const highlightDiv = document.createElement("div");
                    highlightDiv.style.position = "fixed";
                    highlightDiv.style.top = 0;
                    highlightDiv.style.left = 0;
                    highlightDiv.style.width = "100%";
                    highlightDiv.style.height = "100%";
                    highlightDiv.style.backgroundColor = "rgba(0, 0, 0, 0.75)";
                    highlightDiv.style.zIndex = "9999";
                    highlightDiv.addEventListener("click", () => {
                        document.body.removeChild(highlightDiv);
                    });
                    const highlightPhoto = document.createElement("img");
                    highlightPhoto.src = item.url;
                    highlightPhoto.style.maxWidth = "85%";
                    highlightPhoto.style.maxHeight = "85%";
                    highlightPhoto.style.position = "absolute";
                    highlightPhoto.style.top = "50%";
                    highlightPhoto.style.left = "50%";
                    highlightPhoto.style.transform = "translate(-50%, -50%)";
                    highlightDiv.appendChild(highlightPhoto);
                    document.body.appendChild(highlightDiv);
                });

                const downloadButton = document.createElement("button");
                downloadButton.textContent = "Download";
                downloadButton.addEventListener("click", () => {
                    const downloadLink = document.createElement("a");
                    downloadLink.style.display = "none";
                    const downloadUrl = `/download-photo?bucket=${bucket}&name=${item.name}`;
                    downloadLink.setAttribute("href", downloadUrl);
                    downloadLink.setAttribute("download", item.name);
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                });

                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.addEventListener("click", () => {
                    const confirmDelete = window.confirm(
                        "Are you sure you want to delete this " +
                            item.name +
                            "?"
                    );

                    if (confirmDelete) {
                        fetch(
                            `/delete-photo?bucket=${bucket}&name=${item.name}`,
                            {
                                method: "DELETE",
                            }
                        )
                            .then((response) => response.text())
                            .then((data) => {
                                if (data === "OK") {
                                    list.removeChild(listItem);
                                }
                            });
                    }
                });

                listItem.appendChild(anchor);
                listItem.appendChild(downloadButton);
                listItem.appendChild(deleteButton);
                list.appendChild(listItem);
            });
        })
        .catch((error) => {
            bucketContent.textContent = "Error loading items: " + error;
            console.error("Error loading items:", error);
        });
}

function uploadPhoto(parentElement) {
    const label = document.createElement("label");
    label.textContent = "Upload photo:";
    label.setAttribute("for", "file");
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".jpg";
    const uploadButton = document.createElement("button");
    uploadButton.textContent = "Upload";

    parentElement.appendChild(label);
    parentElement.appendChild(input);
    parentElement.appendChild(uploadButton);
}
