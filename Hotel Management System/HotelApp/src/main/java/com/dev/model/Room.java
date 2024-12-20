package com.dev.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="Rooms")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "bookings"})
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer rid;
    
    private String roomType;
    private Double roomPrice;
    private String roomCategory;
    private String roomDescription;
    
    
    @OneToMany(mappedBy = "room") 
    @JsonManagedReference(value = "room-bookings")
    private List<Booking> bookings = new ArrayList<>();
    

    public Room() {}

    public Room(Integer rid, String roomType, Double roomPrice, String roomCategory, String roomDescription) {
        this.rid = rid;
        this.roomType = roomType;
        this.roomPrice = roomPrice;
        this.roomCategory = roomCategory;
        this.roomDescription = roomDescription;
    }

    public Integer getRid() {
        return rid;
    }

    public void setRid(Integer rid) {
        this.rid = rid;
    }

    public String getRoomType() {
        return roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public Double getRoomPrice() {
        return roomPrice;
    }

    public void setRoomPrice(Double roomPrice) {
        this.roomPrice = roomPrice;
    }

    public String getRoomCategory() {
        return roomCategory;
    }

    public void setRoomCategory(String roomCategory) {
        this.roomCategory = roomCategory;
    }

    public String getRoomDescription() {
        return roomDescription;
    }

    public void setRoomDescription(String roomDescription) {
        this.roomDescription = roomDescription;
    }

    public List<Booking> getBookings() {
        return bookings;
    }

    public void setBookings(List<Booking> bookings) {
        this.bookings = bookings;
    }

    @Override
    public String toString() {
        return "Room [rid=" + rid + ", roomType=" + roomType + ", roomPrice=" + roomPrice + ", roomCategory=" + roomCategory
                + ", roomDescription=" + roomDescription + "]";
    }
}