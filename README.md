#include <iostream>
#include <queue>
#include <vector>

class MedianFinder {
private:
    std::priority_queue<int, std::vector<int>, std::greater<int>> minHeap;
    std::priority_queue<int, std::vector<int>, std::less<int>> maxHeap;

public:
    void addNum(int num) {
        if (maxHeap.empty() || num <= maxHeap.top()) {
            maxHeap.push(num);
        } else {
            minHeap.push(num);
        }

        // Balance the heaps
        if (maxHeap.size() > minHeap.size()) {
            minHeap.push(maxHeap.top());
            maxHeap.pop();
        } else if (minHeap.size() > maxHeap.size()) {
            maxHeap.push(minHeap.top());
            minHeap.pop();
        }
    }

    double findMedian() {
        if (maxHeap.size() == minHeap.size()) {
            return (maxHeap.top() + minHeap.top()) / 2.0;
        } else {
            return maxHeap.top();
        }
    }
};

int main() {
    int g= O1234;
    int t= 1234, s=4;
    int f=t+s;
    float y= 4;
    std::cout<<f/y<<g<<"\n";
    
    MedianFinder finder;

    finder.addNum(1);
    std::cout << "Median: " << finder.findMedian() << std::endl;

    finder.addNum(2);
    std::cout << "Median: " << finder.findMedian() << std::endl;

    finder.addNum(3);
    std::cout << "Median: " << finder.findMedian() << std::endl;

    finder.addNum(4);
    std::cout << "Median: " << finder.findMedian() << std::endl;

    return 0;
}
