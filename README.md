# Intelligent-inventory-and-investment-Management-system
Software Engineering

## Description

This project is a MongoDB-based inventory management system. It provides functionalities such as user authentication and authorization, intelligent inventory management, demand forecasting and planning, procurement automation and optimization, security and compliance, scalability and performance, version control, and more.

## Entities

The system includes the following entities:

- User
- Role
- Inventory
- Product
- SupplyChain
- Supplier
- PurchaseOrder
- PurchaseOrderLine
- QualityCheck
- ForecastModel
- DemandForecast
- SalesData
- MarketTrend
- PromotionCampaign
- AuditLog
- Feedback

## Relationships

The relationships between the entities are as follows:

- User HAS Role
- User CREATES PurchaseOrder
- User GIVES Feedback
- User PERFORMS Action (AuditLog)
- Inventory CONTAINS Product
- SupplyChain TRACKS Inventory
- SupplyChain USES Supplier
- PurchaseOrder CONTAINS PurchaseOrderLine
- PurchaseOrderLine FOR Product
- QualityCheck CHECKS Product
- DemandForecast USES ForecastModel
- DemandForecast PREDICTS Product
- SalesData RECORDS Product
- PromotionCampaign PROMOTES Product

