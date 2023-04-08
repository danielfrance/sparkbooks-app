  <table>
      <thead>
          <tr>
              <th>Supplier Name</th>
              <th>Line Item</th>
              <th>Code</th>
              <th>Category</th>
              <th>Total</th>

          </tr>
      </thead>

      <tbody>
          @foreach ($results as $result)
              <tr>
                  <td>
                      <div>
                          <div>
                              <div>
                                  {{ $result->resultDetails->supplier_name }}</div>
                          </div>
                      </div>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>

              </tr>
              @foreach ($result->resultItems as $lineItem)
                  <tr>
                      <td></td>
                      <td>
                          <div> {{ $lineItem->item }}</div>
                          
                      </td>

                      <td>
                          {{ $lineItem->sku }}
                      </td>

                      <td>
                          {{ $lineItem->category?->name . ' - ' . $lineItem->category?->detail ?? ''}}
                      </td>
                      <td>
                          {{ $lineItem->amount }}
                      </td>
                  </tr>
              @endforeach
              <tr>
                  <td>

                  </td>
                  <td></td>
                  <td></td>
                  <td>Subtotal:</td>
                  <td>
                      {{ $result->resultDetails->net_amount }}
                  </td>
              </tr>
              <tr>
                  <td>

                  </td>
                  <td></td>
                  <td></td>
                  <td>Total Amount w/ tax:</td>
                  <td>
                      {{ $result->resultDetails->total_tax_amount }}
                  </td>
              </tr>
              <tr>
                  <td>

                  </td>
                  <td></td>
                  <td></td>
                  <td>Total:</td>
                  <td>
                      {{ $result->resultDetails->total }}
                  </td>
              </tr>
          @endforeach





      </tbody>
  </table>
