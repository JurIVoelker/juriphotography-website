const axios = require("axios");

module.exports = {
  async afterCreate(event) {
    await revalidatePaths();
  },

  async afterUpdate(event) {
    await revalidatePaths();
  },

  async afterDelete(event) {
    await revalidatePaths();
  },
};

async function revalidatePaths() {
  const paths = ["/", "/dashboard"];

  const revalidationPromises = paths.map((path) =>
    axios.post(`${process.env.NEXT_PUBLIC_URL}/api/revalidate`, null, {
      params: {
        secret: process.env.REVALIDATION_SECRET,
        path: path,
      },
    })
  );

  try {
    await Promise.all(revalidationPromises);
    console.log("All paths revalidated successfully");
  } catch (error) {
    console.error("Error revalidating paths:", error);
  }
}
