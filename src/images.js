import { supabase } from "./supabase.js";

async function testImages() {
  const { data, error } = await supabase
    .from("images")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Images ophalen mislukt:", error);
    return;
  }

  console.log("Images uit Supabase:", data);

  const output = document.querySelector("#image-test-output");

  if (!output) {
    console.warn("Geen element met id image-test-output gevonden.");
    return;
  }

  output.innerHTML = data
    .map((image) => `
      <div>
        <h3>${image.title}</h3>
        <img 
          src="${image.image_url}" 
          alt="${image.alt_text || image.title}" 
          width="300"
        />
        <p>Category: ${image.category}</p>
      </div>
    `)
    .join("");
}

testImages();