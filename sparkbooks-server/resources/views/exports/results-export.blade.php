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
                                  {{ $result['name'] }}</div>
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
                          {{-- <div class="text-sm leading-5 text-gray-500">Web dev</div> --}}
                      </td>

                      <td>
                          {{ $lineItem->sku }}
                      </td>

                      <td>
                          {{ $lineItem->category->name . ' - ' . $lineItem->category->detail}}
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
                  <td>Total Amount w/ tax</td>
                  <td>
                      {{ $result['total'] }}
                  </td>


              </tr>
          @endforeach





      </tbody>
  </table>
