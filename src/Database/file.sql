--Trạm xăng
CREATE TABLE GasStations (
    StationID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100) NOT NULL,
    Location VARCHAR(255) NOT NULL,
    TransactionID INT,
    FOREIGN KEY (TransactionID) REFERENCES Transactions(TransactionID) ON DELETE CASCADE
);

--Hàng hoá
CREATE TABLE Goods (
    ProductID INT PRIMARY KEY AUTO_INCREMENT,
    ProductName VARCHAR(100) NOT NULL,
    UnitPrice DECIMAL(10, 2) NOT NULL,
    Availability DECIMAL(10, 2) --Tổng số lít xăng có trong kho
);

--Trụ bơm
CREATE TABLE Pumps (
    PumpID INT PRIMARY KEY AUTO_INCREMENT,
    StationID INT NOT NULL,
    ProductID INT NOT NULL,
    PumpNumber INT NOT NULL, --bởi vì có thể trạm 1 có trụ bơm 1, 2, 3, trạm 2 cũng có thể có trụ bơm 1, 2, 3
    FOREIGN KEY (StationID) REFERENCES GasStation(StationID) ON DELETE CASCADE,
    FOREIGN KEY (ProductID) REFERENCES Goods(ProductID) ON DELETE CASCADE
);

--Giao dịch
CREATE TABLE Transactions (
    TransactionID INT PRIMARY KEY AUTO_INCREMENT,
    PumpID INT NOT NULL,
    StationID INT NOT NULL,
    ProductID INT NOT NULL,
    DateTime DATETIME NOT NULL,
    Quantity DECIMAL(10, 2) NOT NULL,
    TotalPrice DECIMAL(10, 2) GENERATED ALWAYS AS (Quantity * (SELECT UnitPrice FROM Goods WHERE Goods.ProductID = Transaction.ProductID)) STORED,
    DoanhThu DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (PumpID) REFERENCES Pump(PumpID) ON DELETE CASCADE,
    FOREIGN KEY (ProductID) REFERENCES Goods(ProductID) ON DELETE CASCADE,
    FOREIGN KEY (StationID) REFERENCES Stations(StationID) ON DELETE CASCADE
);

-- 5. Indexes to improve performance
CREATE INDEX idx_station_location ON GasStation(Location);
CREATE INDEX idx_goods_productname ON Goods(ProductName);
CREATE INDEX idx_transaction_datetime ON Transaction(DateTime);
