const sendMessageToMail = async (req, res) => {
  const { email, message } = req.body;
  try {
  } catch (error) {
    console.error("Error at sendMessageToMail", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { sendMessageToMail };
