import { createAsyncThunk } from "@reduxjs/toolkit";

const URL = "http://localhost:3001";

const getAllAds = createAsyncThunk("ads/getAllAds", async () => {
  try {
    const data = await fetch(`${URL}/ads`).then((res) => res.json());
    return data;
  } catch (error) {
    console.log(error);
  }
});

const deleteAd = createAsyncThunk("ads/deleteAd", async (id) => {
  try {
    await fetch(`${URL}/ads/${id}`, { method: "DELETE" });
  } catch (error) {
    console.log(error);
  }
});

const editAd = createAsyncThunk("ads/editAd", async (ad) => {
  try {
    await fetch(`${URL}/ads/${ad.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ad),
    });
  } catch (error) {}
});

const createAd = createAsyncThunk("ads/createAd", async (ad) => {
  try {
    await fetch(`${URL}/ads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ad),
    });
  } catch (error) {
    console.log(error);
  }
});

export { getAllAds, deleteAd, editAd, createAd };
