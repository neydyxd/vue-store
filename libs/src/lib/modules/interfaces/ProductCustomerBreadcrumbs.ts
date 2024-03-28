import { CatalogFeature } from "./CatalogFeature";
import { ProductCustomer } from "./ProductCustomer";

export interface ProductCustomerBreadcrumbs {
    product: ProductCustomer;
    catalogBreadcrumbs: CatalogFeature[];
}
