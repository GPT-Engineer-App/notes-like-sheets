import { useState } from "react";
import { Container, VStack, HStack, Input, Button, Box, Text, IconButton } from "@chakra-ui/react";
import { FaTrash, FaEdit } from "react-icons/fa";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddNote = () => {
    if (currentNote.trim() === "") return;
    if (isEditing) {
      const updatedNotes = notes.map((note, index) => (index === editIndex ? currentNote : note));
      setNotes(updatedNotes);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setNotes([...notes, currentNote]);
    }
    setCurrentNote("");
  };

  const handleEditNote = (index) => {
    setCurrentNote(notes[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <HStack width="100%">
          <Input
            placeholder="Enter your note"
            value={currentNote}
            onChange={(e) => setCurrentNote(e.target.value)}
          />
          <Button onClick={handleAddNote} colorScheme="teal">
            {isEditing ? "Update Note" : "Add Note"}
          </Button>
        </HStack>
        <VStack spacing={3} width="100%">
          {notes.map((note, index) => (
            <HStack key={index} width="100%" justifyContent="space-between" p={2} borderWidth={1} borderRadius="md">
              <Text>{note}</Text>
              <HStack>
                <IconButton
                  aria-label="Edit"
                  icon={<FaEdit />}
                  onClick={() => handleEditNote(index)}
                />
                <IconButton
                  aria-label="Delete"
                  icon={<FaTrash />}
                  onClick={() => handleDeleteNote(index)}
                />
              </HStack>
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;