package com.dev.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="Bookings")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Booking {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer bid;
    
    private LocalDate checkInDate;
    
    private LocalDate checkOutDate;
    
    private Integer totalNumberOfGuests;
    
    private String confirmationCode;
    
    @ManyToOne(fetch = FetchType.EAGER) 
    @JoinColumn(name="user_id") 
    @JsonBackReference(value = "user-bookings")
    private User user;
    
    @ManyToOne(fetch=FetchType.LAZY) 
    @JoinColumn(name="room_id")
    private Room room;
    
    
    public Booking() {
        
    }
    
    public Booking(Integer bid, LocalDate checkInDate, LocalDate checkOutDate, Integer totalNumberOfGuests,
            String confirmationCode) {
        
        super();
        this.bid = bid;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.totalNumberOfGuests = totalNumberOfGuests;
        this.confirmationCode = confirmationCode;
    }

    
    public Integer getBid() {
        return bid;
    }

    public void setBid(Integer bid) {
        this.bid = bid;
    }

    public LocalDate getCheckInDate() {
        return checkInDate;
    }

    public void setCheckInDate(LocalDate checkInDate) {
        this.checkInDate = checkInDate;
    }

    public LocalDate getCheckOutDate() {
        return checkOutDate;
    }

    public void setCheckOutDate(LocalDate checkOutDate) {
        this.checkOutDate = checkOutDate;
    }

    public Integer getTotalNumberOfGuests() {
        return totalNumberOfGuests;
    }

    public void setTotalNumberOfGuests(Integer totalNumberOfGuests) {
        this.totalNumberOfGuests = totalNumberOfGuests;
    }

    public String getConfirmationCode() {
        return confirmationCode;
    }

    public void setConfirmationCode(String confirmationCode) {
        this.confirmationCode = confirmationCode;
    }
    
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    @Override
    public String toString() {
        return "Booking [bid=" + bid + ", checkInDate=" + checkInDate + ", checkOutDate=" + checkOutDate
                + ", totalNumberOfGuests=" + totalNumberOfGuests + ", confirmationCode=" + confirmationCode + "]";
    }
}