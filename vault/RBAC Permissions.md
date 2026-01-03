Here is a common set of permissions for the three core roles: **Admin**, **User (Customer)**, and **Seller (Merchant)**.

## 🔑 E-commerce RBAC Permissions

### 1. 🛡️ Admin Role (Super-user / Site Administrator)

The Admin role has the highest level of access and is responsible for site maintenance, policy enforcement, and general oversight.2

| **Area**                | **Permissions**                               | **CRUD Operations** | **Description**                                                                                  |
| ----------------------- | --------------------------------------------- | ------------------- | ------------------------------------------------------------------------------------------------ |
| **User Management**     | `user:manage`, `user:delete`, `user:view_all` | CRUD                | Create, read, update, or delete _any_ user account (customers and sellers).                      |
| **Product & Catalog**   | `product:manage_all`, `category:manage`       | CRUD                | Approve, edit, or delete _any_ product, regardless of the seller. Manage all product categories. |
| **Order & Fulfillment** | `order:view_all`, `order:refund`              | R, U                | View all orders across the platform. Initiate full or partial refunds.                           |
| **Content & Site**      | `content:manage`, `settings:configure`        | CRUD                | Manage static pages, blogs, and site-wide settings (e.g., payment gateways, shipping zones).     |
| **Finance**             | `finance:view_commission`, `finance:payout`   | R, U                | View transaction fees, commission rates, and manage seller payouts.                              |

---

### 2. 🛍️ User Role (Customer)

The User role is limited to actions related to their own account, browsing, and purchasing.

| **Area**     | **Permissions**                        | **CRUD Operations** | **Description**                                                                           |
| ------------ | -------------------------------------- | ------------------- | ----------------------------------------------------------------------------------------- |
| **Browsing** | `product:view`, `search:perform`       | R                   | View all products, search the catalog.                                                    |
| **Shopping** | `cart:manage`, `checkout:process`      | CRUD                | Add items to cart, update cart quantities, and complete the checkout process.             |
| **Account**  | `user:view_self`, `user:update_self`   | R, U                | View and update their own profile information (address, password, etc.).                  |
| **Orders**   | `order:view_self`, `order:cancel_self` | R, U                | View their own order history and potentially cancel recent orders (within a time window). |
| **Reviews**  | `review:create`, `review:edit_self`    | CRUD                | Submit new product reviews and edit/delete their own existing reviews.                    |

---

### 3. 🏪 Seller Role (Merchant / Vendor)

The Seller role is focused on managing their own store, products, and incoming orders. Their permissions are usually scoped to their own `seller_id`.

| **Area**               | **Permissions**                                              | **CRUD Operations** | **Description**                                                                                     |
| ---------------------- | ------------------------------------------------------------ | ------------------- | --------------------------------------------------------------------------------------------------- |
| **Product Management** | `product:create`, `product:edit_self`, `product:delete_self` | CRUD                | Add, update, or delete **only their own** products.                                                 |
| **Inventory**          | `inventory:manage_self`                                      | CRUD                | Update stock levels and manage variations for **their own** products.                               |
| **Order Processing**   | `order:view_self`, `order:update_status`                     | R, U                | View orders placed for **their own** products. Update order status (e.g., "Processing," "Shipped"). |
| **Storefront**         | `store:configure_self`                                       | R, U                | Customize their own store profile, logo, shipping policies, and return settings.                    |
| **Analytics**          | `analytics:view_self`                                        | R                   | View sales reports, product performance, and revenue specific to their store.                       |

---

## 💡 Implementing the RBAC Model

When implementing this, you would check the user's role and the specific permission before allowing an action:

JavaScript

```js
// Example in pseudo-code:
function isAuthorized(user, permission, resourceId = null) {
  // 1. Check if the user has the permission directly
  if (user.permissions.includes(permission)) {
    return true;
  }
  
  // 2. Handle scoped permissions (for Seller)
  if (user.role === 'Seller' && permission.endsWith('_self')) {
    // If resourceId is provided (e.g., the product owner ID)
    // check if the user is the owner.
    // e.g., resource.ownerId === user.id
    return checkResourceOwnership(user.id, resourceId);
  }

  // 3. Fallback to role permissions
  return rolePermissions[user.role].includes(permission);
}

// Example check:
// isAuthorized(loggedInSeller, 'product:edit_self', productId) 
// isAuthorized(loggedInAdmin, 'user:manage')
```

This structure ensures that sellers can only affect their own inventory, users can only manage their own orders, and admins can manage the entire system.