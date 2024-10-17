import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Modal,
} from "react-native";
import { createClient } from "@supabase/supabase-js";
import Card from "@/components/ui/Card";
import { Link } from "expo-router";

export default function TabThreeScreen() {
  const supabase = createClient(
    "https://mezityqgxnauanmjjkgv.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1leml0eXFneG5hdWFubWpqa2d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNTQ3OTMsImV4cCI6MjA0NDYzMDc5M30.FnzXtfkcxM1Xq_TRIsZyb-EOHLNE6-9i0Coq1F4GnHw"
  );


  const [places, setPlaces] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]); // Track selected tags
  const [isModalVisible, setModalVisible] = useState(false); // Track modal visibility


  useEffect(() => {
    getPlaces();
  }, []);


  async function getPlaces() {
    const { data } = await supabase.from("hotspots").select();
    setPlaces(data);
  }


  // Get all unique tags for filtering
  const allTags = [
    ...new Set(places.flatMap((place) => place.tags)), // Extract and flatten unique tags
  ];


  // Filter places based on selected tags
  const filteredPlaces =
    selectedTags.length > 0
      ? places.filter((place) =>
        selectedTags.some((tag) => place.tags.includes(tag))
      )
      : places;


  // Toggle modal visibility
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


  // Handle tag selection in the modal
  const toggleTagSelection = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };


  return (
    <View style={styles.container}>
      {/* Tag Filter UI */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tagContainer}
      >
        {/* Show up to 5 tags, the rest are hidden */}
        {allTags.slice(0, 5).map((tag, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => toggleTagSelection(tag)}
            style={[
              styles.modalTagItem,
              selectedTags.includes(tag) && styles.modalTagItemSelected,
            ]}
          >
            <Text style={styles.tagText}>{tag}</Text>
          </TouchableOpacity>
        ))}
        {/* See More Button */}
        {allTags.length > 5 && (
          <TouchableOpacity onPress={toggleModal} style={styles.seeMoreButton}>
            <Text style={styles.tagText}>See More Tags</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Link to Maps */}
      <Link href="/pages/map" className="m-3 text-center text-blue-600 underline bg-yellow-600 p-2 rounded-lg">
        <Text className="text-white text-center">See in maps</Text>
      </Link>
      {/* Display Places */}
      <ScrollView>
        {filteredPlaces.length > 0 ? (
          filteredPlaces.map((place, index) => (
            <Card place={place} key={index} />
          ))
        ) : (
          <Text style={styles.noPlacesText}>Wait while loading...</Text>
        )}
      </ScrollView>


      {/* Modal for Tag Selection */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Close Modal Cross Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={toggleModal}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>


            <Text style={styles.modalTitle}>Select Tags</Text>
            <ScrollView contentContainerStyle={styles.modalTagList}>
              {allTags.map((tag, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => toggleTagSelection(tag)}
                  style={[
                    styles.modalTagItem,
                    selectedTags.includes(tag) && styles.modalTagItemSelected,
                  ]}
                >
                  <Text style={styles.tagText}>{tag}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>


            <View className="flex flex-row">
              {selectedTags.length > 0 && (
                <TouchableOpacity
                  style={styles.removeFilterButton}
                  onPress={toggleModal}
                >
                  <Text style={styles.removeFilterText}>Apply Filters</Text>
                </TouchableOpacity>
              )}
              {selectedTags.length > 0 && (
                <TouchableOpacity
                  style={styles.removeFilterButton}
                  onPress={() => setSelectedTags([])}
                >
                  <Text style={styles.removeFilterText}>Remove Filters</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 5,
  },
  tagContainer: {
    flexDirection: "row",
  },
  tagButton: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
  },
  activeTag: {
    backgroundColor: "#007bff",
  },
  tagText: {
    color: "#333",
    fontSize: 14,
  },
  seeMoreButton: {
    backgroundColor: "#E9EED9",
    height: 35,
    textAlign: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
    borderRadius: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: "transparent",
  },
  seeMoreText: {
    color: "white",
    fontSize: 14,
  },
  removeFilterButton: {
    alignSelf: "center",
    width: "50%",
    backgroundColor: "#eef6ff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderColor: "black",
    borderWidth: 0.5,
  },
  removeFilterText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
  },
  noPlacesText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 50,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    paddingBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 20,
  },
  modalTagList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  modalTagItem: {
    backgroundColor: "#f0f0f0",
    height: 35,
    textAlign: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
    borderRadius: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: "transparent",
  },
  modalTagItemSelected: {
    backgroundColor: "#eef6ff",
    borderColor: "black",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 24,
    color: "#333",
  },
});


